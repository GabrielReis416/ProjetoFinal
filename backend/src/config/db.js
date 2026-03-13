const { Pool } = require("pg")


//Configurações Banco  

const pool = new Pool({
    user: "postgres", 
    host: "localhost",
    database: "ProjetoFinal",
    password: "1234",
    port: 5432
})

module.exports = pool
