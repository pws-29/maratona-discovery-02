const express = require('express');
// Criar um novo router object (manipulador de rota)
const routes = express.Router()

const views = __dirname + "/views/"

// Criando dados de "profile" no backend; enviar objeto para o Engine (render()) e atualizar meu HTML com EJS.
const profile = {
    name: "Pietro",
    avatar: "https://avatars.githubusercontent.com/u/79719947?s=400&v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4
}

// Método GET escuta o caminho e executa a função que faz o retorno.
// Response é responsável pelo retorno. SendFile => render (quando usamos um view engine, ejs)
// BasePath (__dirname + "views") => não é mais necessário, EJS espera uma pasta views (mas o views está dentro do src...)
routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

module.exports = routes