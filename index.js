const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT ||5000;

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.thodmul.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();

    const carCollection =client.db('UseBrand').collection('Brand');
    const allCarCollection = client.db('UserCar').collection('car')

    // Lode data form Font end 6 logo Brand
    app.post('/AddProduct',async(req,res) => {
        const AllBrands = req.body;
        const result = await carCollection.insertOne(AllBrands);
        res.send(result);

    })
    // sent data font end 6 logo Brand
    app.get('/AddProduct',async  (req, res)=>{
        const cursor = carCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })

      app.get('/AddProduct',async  (req, res)=>{
        const cursor = carCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      })



    //   lode data form font end all car collection

      app.post("/AllProductAdd",async(req,res) =>{
        const allCars = req.body;
        const result = await allCarCollection.insertOne(allCars)
        res.send(result);
      })
    
    //   sent data to server side
    app.get('/AllProductAdd',async(req,res) => {
        const cursor = allCarCollection.find();
        const result = await cursor.toArray();
        res.send(result);

    })

    
   // Update all car collection
    app.put('/AllProductAdd/:id', async (req, res) => {
      const id = req.params.id;
      const filter ={_id: new Object(id)}
      const options ={upsert: true};
      const updated = req.body;
      const cars = {
        $set:{
          Picture:updated.Picture,
          Brand:updated.Brand,
          Type:updated.Type,
          Model:updated.Model,
          Price:updated.Price,
          description:updated.description,
          Rating:updated.Rating,
          Slider:updated.Slider
         
        }
      }
      const result = await allCarCollection.updateOne(filter,cars,options);
      res.send(result)
    })
 

    app.get('/AllProductAdd/:id',async(req,res) => {
        const id =req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await allCarCollection.findOne(query)
        res.send(result);
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req, res) => {
    res.send('Automobailable')
})
app.listen(port,()=>{
    console.log(`Automobailable listening on:${port}`);
})