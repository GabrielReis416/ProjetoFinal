const jwt = require("jsonwebtoken")


//Validação Token
module.exports = (req,res,next) => {

 const token = req.headers.authorization

 if(!token){
  return res.status(401).json({error:"Token necessário"})
 }

 try{

  const decoded = jwt.verify(token,"secret")
  req.userId = decoded.id

  next()

 }catch(err){
  return res.status(401).json({error:"Token inválido"})
 }

}

// Rotas 

const authMiddleware = require("../middleware/authMiddleware")

router.get("/profile", authMiddleware, (req,res)=>{
    res.json({message:"Rota protegida"})
})