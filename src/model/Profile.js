// Model == retornar dados
// Criando dados de "profile" no back-end; enviar objeto para o Engine (render()) e atualizar meu HTML com EJS.
let data = {
    name: "Pietro",
    avatar: "https://github.com/pwsera.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75,
};

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData
    }
}