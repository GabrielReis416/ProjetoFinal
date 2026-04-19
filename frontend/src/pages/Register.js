import { useState } from "react";
import api from "../services/api";
import "../App.css";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); 
    
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Usuário criado com sucesso!");
      
    } catch (error) {
      alert("Erro ao criar usuário. Tente novamente.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Cadastro</h2>
        
        <form className="register-form" onSubmit={handleRegister}>
          <input
            className="register-input"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="register-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="register-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" className="register-button">
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;