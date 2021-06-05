const Profile = require('../model/Profile')

module.exports =  {
    index(req, res) {
      return res.render("profile", { profile: Profile.get() })
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

      Profile.update({
        ...Profile.get(),
        ...req.body,
        "value-hour": valueHour
      }) 

      return res.redirect('/profile')
    }
  }