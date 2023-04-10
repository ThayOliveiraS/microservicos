import express from "express";
import mysql from 'mysql';
import cors from 'cors'; //Para evitar problemas com a proteção dos computadores
import bodyParser from 'body-parser';
import multer from 'multer';

const conexao = mysql.createConnection
({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'db'
});

const upload = multer();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());



conexao.connect(err => {
    if(err) {
        throw err;
    }
    console.log('Conectado')
});

app.post('/cliente/gravar', (req, res) => {
    const {idcliente, nome, telefone, email, logradouro, numero, complemento, bairro, cidade, uf, cep, idtipo_cliente,tipo} = req.body;

    const sql = 'INSERT INTO clientes (idcliente, nome, email, telefone, logradouro, numero, complemento, bairro, cidade, cep, idtipo_cliente, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const sql2 = 'INSERT INTO tipo_cliente (idtipo_cliente, tipo) VALUES (?, ?)';
   
    conexao.query(sql, [ idcliente, nome, email, telefone, logradouro, numero, complemento, bairro, cidade, cep, idtipo_cliente, uf,tipo], (err, result) => {
      if (err) {
        console.log(`Erro ao inserir dados no banco de dados: ${err.message}`);
        res.status(500).send('Erro interno do servidor');
      } else {
        console.log(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
        res.status(200).send(`Dados inseridos com sucesso. ID do novo cliente: ${result.insertId}`);
      }
    });

  });
 

app.listen(3002, () => {
    console.log('Servidor funcionando...')
});
  
