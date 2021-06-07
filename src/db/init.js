// Rodar uma única vez, responsável por criar meu arquivo de DB.
const Database = require('./config');

const initDb = {
    async init() {
   
// Iniciando conexão com o banco (precisa fechar)
const db = await Database();

// Códigos de BD sempre passados em crase
// Criar tabelas (job, profile)
await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT, 
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
);`);

await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME
);`);

//Inserir dados na tabela
await db.run(`INSERT INTO profile (
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
) VALUES (
    "Pietro",
    "https://github.com/pwsera.png",
    3000,
    5,
    5,
    4,
    70
);`);

await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "Pizarria Guloso",
    2,
    1,
    1617514376018
);`);

await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at
) VALUES (
    "One Two Prjects",
    3,
    47,
    1617514376018
);`);

// Encerrar conexão
await db.close();

// O arquivo será iniciado direto com packeg.json (npm init-db)
    }

}

initDb.init()


