var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ejs = require('ejs');
const path = require('path');
var app = express();

//configuration seveur express
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//configuration db
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'example-db'
});

connection.connect();

//requete select

//   console.log('personnes list  ', result)
app.get('/',
  function (req, res) {
    connection.query('SELECT * FROM personnes ', function (error, result) {
      console.log(__dirname);
      res.render('index', { msg: 'hello world', personnes: result, long: result.length });

    });


  }
)

app.post('/search',
  function (req, res) {

    var q = "SELECT * FROM personnes where " +
      "nom like '%" + req.body.searchText + "%' or " +
      "prenom like '%" + req.body.searchText + "%' or " +
      "tel like '%" + req.body.searchText + "%'"

    console.log(q);
    console.log("pppppp");


    connection.query(q, function (error, result) {
      console.log(__dirname);
      res.render('index', {
        msg: 'hello world , result(s) of search ',
        personnes: result?result:[],
        long: result?result.length:0
      });

    });


  }
)

app.get('/delete:id',
  function (req, res) {
    connection.query('delete FROM personnes where id= ' + req.params.id, function (error, result) {

      res.render('ajoute', { msg: req.params.id + 'supprimé avec succés' });

    });


  }
)
//upsert = update or insert
app.post('/personnes', (req, res) => {
  var r = req.body;
  let q = ' INSERT INTO personnes(id, nom, prenom, tel)   VALUES (?,?,?,?)'
    + 'ON DUPLICATE KEY UPDATE '
    + ' nom= ?,prenom= ?,tel= ?'

  //respectivement ordonnés comme dans la requete
  let d = [r.id, r.nom, r.prenom, r.tel, r.nom, r.prenom, r.tel]

  let query = mysql.format(q, d)


  connection.query(query, function (err, result) {
    if (err) throw err;
    //enregistrer c'est ajouter ou modifier
    // res.send('Enregistré avec succes')


    res.redirect('http://localhost:3000')
  })
})



app.post('/deletePersonne',
  function (req, res) {

    var q = 'delete FROM personnes where id=' + req.body.id;
    console.log(q)
    connection.query(q, function (error, result) {
      res.redirect('http://localhost:3000')
    });

  }
)





app.listen(3000);


console.log('The server is up and running at http://localhost:3000');


