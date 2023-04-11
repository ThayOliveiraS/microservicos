const mysql = require ('mysql');

// Configurando o banco de dados (esta em rede)
const db = mysql.createConnection({
  host: 'mysql1',
  user: 'root',
  password: '123456',
  database: 'db'
});

// Conectando-se ao banco de dados
db.connect((err) => {
  if (err) {
    console.log(`Erro ao conectar-se ao banco de dados: ${err.message}`);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
  }
});

module.exports = db;
