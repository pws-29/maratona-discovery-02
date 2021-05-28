const express = require('express');
// Criar um novo router object (manipulador de rota)
const routes = express.Router()

const views = __dirname + "/views/"

// Criando dados de "profile" no back-end; enviar objeto para o Engine (render()) e atualizar meu HTML com EJS.
const Profile = {
  data: {
    name: "Pietro",
    avatar: "https://github.com/pwsera.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
  },

  controllers: {
    index(req, res) {
      return res.render(views + "profile", { profile: Profile.data })
    },

    update(req, res) {
      // cálculo de custo de horas. req.body para buscar os dados
      const data = req.body

      // definir semanas tem no ano: 52
      const weeksPerYears = 52

      // removar semanas de férias do ano (semanas em um mÊs)
      const weeksPerMonth = (weeksPerYears - data["vacation-per-year"]) / 12

      // quantas horas por semana estou trabalhado
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

      // total de horas trabalhadas no mÊs
      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      // Qual será o valor da minha hora
      const valueHour = data["monthly-budget"] / monthlyTotalHours

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      }

      return res.redirect('/profile')
    }
  },
}

const Job = {
  data: [
    // Controle para salvar meus Jobs,, recebidos com o metodo post (em memória)
    {
      id: 1,
      name: 'Pizzaria do Guloso',
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    }
  ],

  controllers: {
    index(req, res) {
      // Criar um job novo 
      const updatedJobs = Job.data.map((job) => {
        // ajustes no job; Cálculos (tempo restante)
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job, //espalhamento de objeto
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
        }
      })
      return res.render(views + "index", { jobs: updatedJobs })
    },

    create(req, res) {
      return res.render(views + "job")
    },

    save(req, res) {
      // ref req.body { name: 'sf', 'daily-hours': '5', 'total-hours': '2' }
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje
      })
      return res.redirect('/')
    },

    // Job/edit, informações corretas na página
    show(req,res) {
      const jobId = req.params.id //exato nome da url

      const job = Job.data.find(job => Number(job.id) === Number(jobId)) 
      if (!job) {
        return res.send('Job not found!')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])


      return res.render(views + "job-edit", { job })
    },

    update(req, res) {
      const jobId = req.params.id //exato nome da url

      const job = Job.data.find(job => Number(job.id) === Number(jobId)) //joga na constante
      if (!job) {
        return res.send('Job not found!')
      }

      const updatedJob = {
        // expalhando
        ...job, 
        //override
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
      }

      Job.data = Job.data.map(job => {
        // updating job
        if(Number(job.id) === Number(jobId)) {
          job = updatedJob
        }

        return job
      })

      res.redirect('/job/' + jobId)
    },

    delete(req, res) {
      const jobId = req.params.id

      Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

      return res.redirect('/')
    }
  },

  services: {
    // cálculo dias restantes
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

      const createdDate = new Date(job.created_at)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay) // data no futuro

      const timeDiffInMs = dueDateInMs - Date.now()
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)

      // restam x dias
      return dayDiff
    },

    calculateBudget: (job, valueHour) =>  valueHour * job["total-hours"]
  }
}

// Método GET escuta o caminho e executa a função que faz o retorno.
// Response é responsável pelo retorno. SendFile => render (quando usamos um view engine, ejs)
// BasePath (__dirname + "views") => não é mais necessário, EJS espera uma pasta views (mas o views está dentro do src...)
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index) 
routes.post('/profile', Profile.controllers.update) 

module.exports = routes

// Usamos o método POST para salvar os dados adcionados pelo usuário na página /job Form: (action: "/job" method:"post");
// Criamos uma rota para o POST, com intençao de trazer o req.body e armazenar em um array;
// Habilitamos o req.body no servidor com o express