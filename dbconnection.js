
// Importing MySQL module
const mysql = require("mysql");
  
// Creating connection
let connection = mysql.createConnection({
  host: "localhost", //실제 연결할 db위치
  user: "root",
  password: "nnstock",
  port : 3306,
  database: "stock" //db이름
});
  
// Connect to MySQL server
connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});
  
module.exports = connection;


