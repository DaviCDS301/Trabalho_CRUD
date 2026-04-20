const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database:'Sistema_Escola',
  password:'root',
  port: 5432
});

module.exports = pool;
