// Configurações do meu banco de dados
const sqlite3 = require("sqlite3");
const { open } = require("sqlite"); //buscar apenas a funcionalidade "open"

// Abrir conexão com banco de dados
// Open deve estar em uma estrutura de função
module.exports = () => 
  open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
;
