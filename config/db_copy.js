const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'mukja',
})

conn.connect();

module.exports = conn;