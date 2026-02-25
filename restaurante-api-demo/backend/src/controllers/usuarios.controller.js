const db = require('../services/database');

const getUsuarios = async (req, res) => {
  try {
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

module.exports = {
  getUsuarios
};