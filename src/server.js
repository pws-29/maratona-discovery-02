// Chamando o módulo e capturando em uma variável
const express = require("express")
// Criando um servidor na variável
const server = express()
// Importar rotas
const routes = require('./routes')
// Setando minha view engine. Processamento do html, explorano com JS e entregando HTML puro.
// BasePath do ejs é o 'views'.
server.set('view engine', 'ejs')

// habilitar arquivos statics e criar rotas
server.use(express.static("public"))

// Ligando meu servidor, que irá escutar a porta 3000 (localhost:3000). A porta está aberta
server.use(routes)
server.listen(3030, () => console.log('rodando')) 
