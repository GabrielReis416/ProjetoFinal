const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {

 const authHeader = req.headers.authorization

 // Conferir tonken

 if(!authHeader){
  return res.status(401).json({ error: "Token não fornecido" })
 }

 const token = authHeader.split(" ")[1]

// Verificar se Token e valido

 try {
  const decoded = jwt.verify(token, "secret")
  req.userId = decoded.id
  next()
 } catch (err) {
  return res.status(401).json({ error: "Token inválido" })
 }

}

module.exports = authMiddleware