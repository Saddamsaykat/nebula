const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.caycpiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const db = client.db("zhsust_alumni");
    const postsCollection = db.collection("department");

    // posts collection
    app.post("/createPost", async (req, res) => {
      const newPost = req.body;
      console.log("New Post", newPost);
      const result = await postsCollection.insertOne(newPost);
      res.json(result);
    });

    app.get("/getPosts", async (req, res) => {
      const result = await postsCollection.find().toArray();
      console.log(result);
      res.json(result);
    });

    app.delete("/deletePost/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid ID format" });
        }
        const query = { _id: new ObjectId(id) }; // Convert id to ObjectId
        console.log("Query:", query);
        const result = await postsCollection.deleteOne(query);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    });

    app.patch("/getPosts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Invalid ID format" });
        }
        const query = { _id: new ObjectId(id) };
        const update = { $set: req.body };
        console.log("Query:", query);
        console.log("Update:", update);
        const result = await postsCollection.updateOne(query, update);
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    });

    console.log("Connected to MongoDB");
    await client.db("admin").command({
      ping: 1,
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello ZHSUST");
});

app.listen(port, () => {
  console.log(`Server Is running ${port}`);
});
