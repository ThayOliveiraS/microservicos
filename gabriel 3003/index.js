const express = require('express');
const cors = require('cors');
const multer = require('multer');
const rotas = require('./cliente_buscar_id');

const app = express();
const porta = 3003;

// Configurando o express para lidar com POSTs
app.use(express.json())

// Configurando o CORS
app.use(cors());

// Definindo o middleware para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Utilizando as rotas
app.use(rotas);

// Iniciando o servidor
app.listen(porta, () => {
  console.log(`Servidor ouvindo na porta ${porta}`);
});
