import { useState } from "react"
import api from "../services/api"

// Registrar Usuario
function Register() {
 const [name, setName] = useState("")
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")

 const handleRegister = async () => {
  await api.post("/api/auth/register", {
   name,
   email,
   password
  })

  alert("Usuário criado!")
 }

 return (
  <div>
   <h2>Cadastro</h2>
   <input placeholder="Nome" onChange={e => setName(e.target.value)} />
   <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
   <input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} />
   <button onClick={handleRegister}>Cadastrar</button>
  </div>
 )
}

export default Register