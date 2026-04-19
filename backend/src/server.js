const express = require("express")
const cors = require("cors")


//App
const app = express()

app.use(cors())
app.use(express.json())

// Conexão com O banco de Dados 
const db = require("./config/db")

//Teste Conexão
db.query("SELECT NOW()", (err,res)=>{
 if(err){
  console.log("Erro:", err)
 }else{
  console.log("Banco conectado:", res.rows)
 }
})

app.get("/", (req, res) => {
 res.send("API funcionando")
})

app.listen(3001, () => {
 console.log("Servidor rodando na porta 3000")
})

// Rotas

const taskRoutes = require("./routes/taskRoutes")

app.use("/api", taskRoutes)

const authRoutes = require("./routes/authRoutes")

app.use("/api/auth", authRoutes)