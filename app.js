const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.sendFile('index.html');

  // console.log("Did we reach the end point?");
  // res.redirect('/ejs');
})
  

app.get('/ejs', function(req, res){


  res.render('word', {pageTitle: "my page title"})

});

app.get('/nodemon', function (req, res) {
  res.send('im in nodemon')
})

app.get ('/helloRender', function (req, res) { 
  res.send('Hello Express from the Real World <br><a href="/">Back to Home</a>')
});

app.listen(  
  port,
  ()=> console.log( 
    `server is running on... localhost:${port}`
  )
)