const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mysql1',
  user: 'root',
  password: '123456',
  database: 'db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('MySQL database is connected.');
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/cliente/buscar/email/:email', (req, res) => {
const query = 'SELECT clientes.*, tiposdeclientes.tipos FROM clientes JOIN tiposdeclientes ON clientes.idtiposdeclientes = tiposdeclientes.idtiposdeclientes WHERE clientes.email = ?;';

  connection.query(query, [req.params.email], (_err, result) => {
    res.send(result.at(-1));
  });
});

const port = 3004;
app.listen(port, () => console.log('Express server listening on port ' + port));