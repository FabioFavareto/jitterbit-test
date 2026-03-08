const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Script para rodar a migration SQL
const runMigration = async () => {
  // Conecta SEM banco de dados primeiro
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    const sql = fs.readFileSync(path.join(__dirname, 'migration.sql'), 'utf8');

    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      await conn.query(statement);
      console.log('Executado:', statement.substring(0, 60) + '...');
    }

    console.log('\nMigration concluída com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro na migration:', err.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
};

runMigration();