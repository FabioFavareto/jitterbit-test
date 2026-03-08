const mysql = require('mysql2/promise');
require('dotenv').config();

// Conectando ao banco de dados 
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
});

pool.getConnection()
  .then(conn => {
    console.log('Conectado ao MySQL');
    conn.release();
  })
  .catch(err => {
    console.error('Erro na conexão com o banco:', err.message);
  });

module.exports = pool;