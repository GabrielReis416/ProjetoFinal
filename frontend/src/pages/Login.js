import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); //mudar de página

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Login</h2>
        
        <form className="register-form" onSubmit={handleLogin}>
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
            ENTRAR
          </button>
        </form>

        <p className="login-footer">
          Não tem uma conta?{" "}
          <span className="login-link" onClick={() => navigate("/register")}>
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;