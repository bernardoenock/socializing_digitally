const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const ACCESS_TOKEN = process.env.ACCESS_TOKEN; // Coloque seu token de acesso no arquivo .env
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID; // Coloque o ID da conta do Instagram no arquivo .env

app.use(express.static('public'));

// Endpoint para buscar posts
app.get('/api/posts', async (req, res) => {
  try {
    const url = `https://graph.instagram.com/v15.0/${INSTAGRAM_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${ACCESS_TOKEN}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao buscar publicações:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || 'Erro interno no servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
