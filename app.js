const express = require('express')
require('dotenv').config()
const app = express()
const shajs = require('sha.js')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const {MongoClient, ServerApiVersion } = require('mongodb'); 
const uri = process.env.MONGO_URI; 

console.log(uri);


app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'))




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


console.log(shajs('sha256').update('cat').digest('hex')); 


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


// run().catch(console.dir);

//async function getData() { 
//   await client.connect(); 
//   let collection = await client.db("guitar-app-database").collection("guitar-app-songs"); 
//   let results = await collection.find({}).toArray(); 
//   console.log(results);   
//   return results; 
//   //.limit(50)
//     //.toArray(); 
//   //res.send(results).status(200); 
// }

async function getData() {

  await client.connect();
  console.log('connected');
  // let collection = client.db("guitar-app-database").collection("guitar-app-songs"); 
  let collection = client.db("nbsobie-profiledb").collection("nb-sobie-profile");
  console.log('collected');

  let results = await collection.find({}).toArray();

  console.log("in getData() results: ", results);
  return results;

}

// getData();

app.get('/read', async function (req, res) {
  let getDataResults = await getData(); 
  console.log("here", getDataResults); 
  res.render('hobbies', 
    { hobbyData : getDataResults} ); 

})

app.post('/delete/:id', async (req,res)=>{

  console.log("in delete, req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("nbsobie-profiledb")
  .collection("nb-sobie-profile");
  let result = await collection.findOneAndDelete( 
    {
      "_id": new ObjectId(req.params.id)
    }
  ).then(result => {
  console.log(result); 
  res.redirect('/read');})

  

})


app.get('/', function (req, res) {
  res.sendFile('index.html');

  // console.log("Did we reach the end point?");
  // res.redirect('/ejs');
})
  
app.post('/saveMyName', (req,res)=> { 
  console.log('did we hit the get endpoint?'); 
  console.log(req.body);
  res.render('words', 
  {pageTitle: req.body.myname})
  // let reqName
})

app.get('/saveMyNameGet', (req,res)=> { 
  console.log('did we hit the get endpoint?'); 
  console.log('req.query: ', req.query);
  let reqName = req.query.myNameGet; 
  res.render('words', 
    {pageTitle: reqName});   
})


app.get('/read', async function (req, res) { 
  let getDataResults = await getData(); 
  console.log(getDataResults); 
  res.send(getDataResults); 
  res.render('hobbies', 
    { hobbyData : getDataResults})
})

app.get('/ejs', 
  function(req, res) 
  {
  res.render('word', 
    {pageTitle: 'my page title'}
  )
  }
)

app.get('/nodemon', function (req, res) {
  res.send('im in nodemon'); 
})

app.get ('/helloRender', function (req, res) { 
  res.send('Hello Express from the Real World<br><a href="/">Back to Home</a>')
})

/*app.listen(
  port, 
  ()=> console.log(
    `server is running on ... localhost:${port}`
    )
  );
*/ 

// Problem with Insert // 
  app.post('/insert', async (req,res)=> {
    console.log('in /insert');
    let newhobby = req.query.Myname; 
    console.log('in /insert'); 
    //connect to db,
    await client.connect();
    //point to the collection 
    await client
      .db("nbsobie-profiledb")
      .collection("nb-sobie-profile")
      .insertOne({ whatthewhatever : "newhobby 1"});
    res.redirect('/');

  }); 

  app.post('/update', async (req,res)=>{

    console.log("req.body: ", req.body)
  
    client.connect; 
    const collection = client.db("nbsobie-profiledb")
    .collection("nb-sobie-profile");
    let result = await collection.findOneAndUpdate( 
    {"_id": new ObjectId(req.body.nameID)}, { $set: {"fname": req.body.inputUpdateName } }
  )
  .then(result => {
    console.log(result); 
    res.redirect('/read');
  }) 
  });


  app.listen(
    port, 
    ()=> console.log(
      `server is running on ... localhost:${port}`
      )
    );