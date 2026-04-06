import { useState } from "react"
import api from "../services/api"

// Login
function Login() {
 const [email, setEmail] = useState("")
 const [password, setPassword] = useState("")

 const handleLogin = async () => {
  const response = await api.post("/api/auth/login", {
   email,
   password
 })

  localStorage.setItem("token", response.data.token)

  alert("Login realizado!")
 }

 return (
  <div>
   <h2>Login</h2>
   <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
   <input placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} />
   <button onClick={handleLogin}>Entrar</button>
  </div>
 )
}

export default Login