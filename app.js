const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const uri = process.env.MONGO_URI; 

console.log(uri);


app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'))


// begin all my middlewere 

const { MongoClient, ServerApiVersion } = require('mongodb');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);





app.get('/', function (req, res) {
  res.sendFile('index.html');

  // console.log("Did we reach the end point?");
  // res.redirect('/ejs');
})
  
app.post('/saveMyName', (req,res)=> { 
  console.log('did we hit the get endpoint?'); 
  console.log('req.query: ', req.body);

  res.render('word', 
  {pageTitle: req.body.myname})
  // let reqName
})

app.get('/saveMyNameGet', (req,res)=> { 
  console.log('did we hit the get endpoint?'); 
  console.log('req.query: ', req.query);
  let reqName
})



app.get('/ejs', function(req, res){
  res.render('word', 
  {pageTitle: "my page title"})

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