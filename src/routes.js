const express = require("express");
// Criar um novo router object (manipulador de rota)
const routes = express.Router();
// Importar controllers para uso das rotas profile
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobControllers");
const DashboardController = require("./controllers/DashboardController")

// Método GET escuta o caminho e executa a função que faz o retorno.
// Response é responsável pelo retorno. SendFile => render (quando usamos um view engine, ejs)
// BasePath (__dirname + "views") => não é mais necessário, EJS espera uma pasta views (mas o views está dentro do src...)
routes.get("/", DashboardController.index);
routes.get("/job", JobController.create);
routes.post("/job", JobController.save);
routes.get("/job/:id", JobController.show);
routes.post("/job/:id", JobController.update);
routes.post("/job/delete/:id", JobController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/profile", ProfileController.update);

module.exports = routes;

// Usamos o método POST para salvar os dados adcionados pelo usuário na página /job Form: (action: "/job" method:"post");
// Criamos uma rota para o POST, com intençao de trazer o req.body e armazenar em um array;
// Habilitamos o req.body no servidor com o express
