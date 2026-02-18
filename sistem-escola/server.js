const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Sistema Escola funcionando 🚀');
});

app.get('/teste-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao conectar no banco' });
  }
});

app.get('/alunos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM alunos');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar alunos' });
    }
  });
  

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
