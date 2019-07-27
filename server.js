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

//   console.log('personnes list  ', result)
  app.get('/',
  function (req,res) {
    connection.query('SELECT * FROM personnes ', function (error, result) {
      console.log(__dirname);
      console.log(result.length);
      res.render('index',{msg:'hello world' ,personnes:result,long:result.length});

    });
     
      
  }
  )

  app.post('/personnes',(req,res)=> {

     console.log(req.body);


    connection.query("INSERT INTO personnes(nom, prenom, tel) VALUES ('"+req.body.nom+"','"+
    req.body.prenom+"','"+
    req.body.tel+"')"
  
    ,function (err, result) {
      if (err) throw err;
      res.render('ajoute',{msg:'ajouté avec succes'})
    })

    
  }
  
  
  )




 
app.listen(3000);


 
console.log('The server is up and running at http://localhost:3000');

