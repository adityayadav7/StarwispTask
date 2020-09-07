'user strict';

const mysql = require('mysql');


const database = mysql.createConnection({
  host     : '34.93.55.91',
  user     : 'starwisp',
  password : 'star@123',
  database : 'starwispDatabase'
});
database.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = database;