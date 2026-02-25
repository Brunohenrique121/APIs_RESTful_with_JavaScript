import { useEffect, useState } from "react";
import "./usuarios.css";
import { getUsuarios } from "./services/api";

function Usuarios(){
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    // Buscar os usuarios 
    const buscarUsuarios = async () => {
        try {
            setLoading(true);

            console.log("BATE AQUI")
            const response = await getUsuarios();

            console.log(response.data, "responseEEEEEE");

            const data = await response.data;
            setUsuarios(data.dados);
        } catch (err) {
            setErro("Erro ao carregar usuários");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarUsuarios();
    }, []);

    // Criar usuário
  const criarUsuario = async (e) => {
    e.preventDefault();

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      setNome("");
      setEmail("");
      setSenha("");
      buscarUsuarios();
    } catch (err) {
      setErro("Erro ao criar usuário");
    }
  };

  return (
    <div className="usuarios-container">
      <h2>👤 Usuários</h2>

      <form onSubmit={criarUsuario} className="form-usuario">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      {loading && <p className="loading-user">Carregando...</p>}
      {erro && <p className="erro-user">{erro}</p>}

      <div className="usuarios-lista">
        {usuarios.map((user) => (
          <div key={user.id} className="usuario-card">
            <h3>{user.nome}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Usuarios;