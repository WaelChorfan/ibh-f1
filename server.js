var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejs = require('ejs');
const path = require('path');
var app = express();


//configuration seveur express
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/views');  
app.set('view engine','ejs');


//configuration db
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'example-db'
});
 
connection.connect();
 
//requete select
connection.query('SELECT * FROM personnes ', function (error, result) {
//   console.log('personnes list  ', result)
  app.get('/',
  function (req,res) {
      //req request 
      //res respnse
      console.log(__dirname);
      res.render('index',{msg:'hello world' ,personnes:result});
      // res.render('index');
      // res.send('ok')
      
  }
  )

});


 
app.listen(3000);


 
console.log('The server is up and running at http://localhost:3000');

