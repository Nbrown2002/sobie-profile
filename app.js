const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.sendFile('index.html');
})



app.get('/nodemon', function (req, res) {
  res.send('im in nodemon')})

app.get ('/helloRender', function (req, res) { 
  res.send('Hello Express from the Real World <br><a href="/">Back to Home</a>')
});

app.listen(  
  port,
  ()=> console.log( 
    `server is running on...${port}`
  )
)