const db = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
 const { name, email, password } = req.body

 const hashedPassword = await bcrypt.hash(password, 10)

 const result = await db.query(
  "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
  [name, email, hashedPassword]
 )

 res.json(result.rows[0])
}

// JWT
exports.login = async (req, res) => {

 const { email, password } = req.body

 const user = await db.query(
  "SELECT * FROM users WHERE email=$1",
  [email]
 )

 if(user.rows.length === 0){
  return res.status(400).json({error:"Usuário não encontrado"})
 }

 const validPassword = await bcrypt.compare(
  password,
  user.rows[0].password
 )

 if(!validPassword){
  return res.status(401).json({error:"Senha inválida"})
 }

 const token = jwt.sign(
  { id: user.rows[0].id },
  "secret",
  { expiresIn: "1d" }
 )

 res.json({token})
}