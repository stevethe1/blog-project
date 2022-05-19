const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blog"
  
});

db.connect(function (err){
  if (err) throw err;
    console.log("Connected!");
    //db.query('SELECT 1 FROM blogs');
  });

module.exports = db;