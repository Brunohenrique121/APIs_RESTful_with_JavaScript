const bcrypt = require('bcrypt')
const db = require('../services/database');

const getUsuarios = async (req, res) => {
  try {
    console.log("entrou")
    const [rows] = await db.query('SELECT * FROM usuarios'); 

    res.json({
      sucesso: true,
      dados: rows
    });
  } catch (erro) {
    console.error(erro); // Log para ajudar no debug do Render
    res.status(500).json({ sucesso: false, mensagem: "Erro ao acessar o banco" });
  }
};


const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.params;



    if (!email || !senha) {
      return res.status(400).json({
        sucesso: false,
        mensagem: "Email e senha são obrigatórios"
      });
    }

    console.log("BATEU AQUI VIUN")

    // 🔎 Busca o usuário no banco
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    // ❌ Se não existir
    if (rows.length === 0) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Email ou senha incorretos"
      });
    }

    const usuario = rows[0];

    // // 🔐 Verifica senha

    // if (!senhaValida) {
    //   return res.status(401).json({
    //     sucesso: false,
    //     mensagem: "Senha incorreta"
    //   });
    // }

    // ✅ Login correto
    res.json({
      sucesso: true,
      mensagem: "Login realizado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (erro) {
    console.error("ERRO LOGIN:", erro);
    res.status(500).json({
      sucesso: false,
      mensagem: "Erro no servidor"
    });
  }
};


module.exports = {
  getUsuarios,
  loginUsuario
};