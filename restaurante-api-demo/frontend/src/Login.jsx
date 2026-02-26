import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUsuario } from "./services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();



  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !senha) {
    setErro("Preencha todos os campos");
    return;
  }

  const response = await loginUsuario(email, senha);

  console.log(response[0])

  localStorage.setItem("logado", "true"); // marca como logado
  navigate("/"); // redireciona para o cardápio
};

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>🔐 Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="login-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {erro && <p className="login-error">{erro}</p>}

        <button type="submit" className="login-button">
          Entrar
        </button>
      </form>
    </div>

    
  );
}

export default Login;