const pgp = require('pg-promise')();
const db = pgp({
  user: 'postgres',
  password: 'admin123',
  host: 'localhost',
  port: 5432,
  database: 'questionario'
});


module.exports = db;