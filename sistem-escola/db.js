const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database:'sistema_escola',
  password:'root',
  port: 5432,
});

module.exports = pool;
