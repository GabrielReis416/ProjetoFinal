const { Pool } = require("pg")


//Configurações Banco  

const pool = new Pool({
    user: "postgres", 
    host: "localhost",
    database: "projeto_final",
    password: "12345678",
    port: 5432
})

module.exports = pool
