const express = require('express');
const multer = require('multer');
const db = require('./dbconexao');
const upload = multer();
const router = express.Router();

router.get('/cliente/buscar/id/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM clientes WHERE idclientes = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(`Erro ao buscar dados no banco de dados: ${err.message}`);
      return res.status(500).send('Erro interno do servidor');
    }
    console.log(`Dados encontrados: ${JSON.stringify(result)}`);
    return res.status(200).send(result);
  });
});

module.exports = router;
