
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://BewBeamD:j8XgzqiSDbM45UMd@cluster0.o9fixzo.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

require('dotenv').config()

const Pool = require("pg").Pool;
 
const pool = new Pool({
  host: `${process.env.PGHOST}`,
  user: `${process.env.PGUSER}`,
  password: `${process.env.PGPASSWORD}`,
  port: `${process.env.PGPORT}`,
  database: `${process.env.PGDATABASE}`,
  ssl:true
});
 

module.exports= pool
