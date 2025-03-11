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
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.impv5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri ='mongodb+srv://zhsust_db:2eMJpLZHKFUiARxd@cluster0.62tdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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
     
    // app.post("/createPost", async (req, res) => {
    //   try {
    //     const { batch, department } = req.body;
    
    //     // Check if the email exists anywhere in the database
    //     const existingStudent = await postsCollection.findOne({
    //       "department.cse.email": { $in: Object.values(department).flat().map(s => s.email) }
    //     });
    
    //     if (existingStudent) {
    //       return res.status(400).json({ message: "This email is already registered in another batch/department" });
    //     }
    
    //     // Find existing batch
    //     const existingBatch = await postsCollection.findOne({ batch });
    
    //     if (existingBatch) {
    //       const updatedDepartment = { ...existingBatch.department };
    
    //       for (const dept in department) {
    //         if (!updatedDepartment[dept]) {
    //           updatedDepartment[dept] = department[dept]; // Add new department
    //         } else {
    //           // Avoid duplicate students in the department array
    //           const existingEmails = new Set(updatedDepartment[dept].map(student => student.email));
    
    //           department[dept].forEach(student => {
    //             if (!existingEmails.has(student.email)) {
    //               updatedDepartment[dept].push(student);
    //               existingEmails.add(student.email); // Track added email
    //             }
    //           });
    //         }
    //       }
    
    //       // Update batch in the database
    //       const result = await postsCollection.updateOne(
    //         { batch },
    //         { $set: { department: updatedDepartment } }
    //       );
    
    //       res.json({ message: "Student added successfully", result });
    //     } else {
    //       // Insert a new batch if it doesn’t exist
    //       const newBatch = { batch, department };
    //       const result = await postsCollection.insertOne(newBatch);
    //       res.json({ message: "New batch created", result });
    //     }
    //   } catch (error) {
    //     console.error("Error creating/updating post:", error);
    //     res.status(500).json({ error: "Internal Server Error" });
    //   }
    // });
    app.post("/createPost", async (req, res) => {
      try {
        const { batch, department } = req.body;
    
        // Check if the email exists anywhere in the database
        const existingStudent = await postsCollection.findOne({
          "department": { $elemMatch: { "email": { $in: Object.values(department).flat().map(s => s.email) } } }
        });
    
        if (existingStudent) {
          return res.status(400).json({ message: "This email is already registered in another batch/department" });
        }
    
        // Find existing batch
        const existingBatch = await postsCollection.findOne({ batch });
    
        if (existingBatch) {
          const updatedDepartment = { ...existingBatch.department };
    
          for (const dept in department) {
            if (!updatedDepartment[dept]) {
              updatedDepartment[dept] = department[dept]; // Add new department
            } else {
              // Avoid duplicate students in the department array
              const existingEmails = new Set(updatedDepartment[dept].map(student => student.email));
    
              department[dept].forEach(student => {
                if (!existingEmails.has(student.email)) {
                  updatedDepartment[dept].push(student);
                  existingEmails.add(student.email); // Track added email
                }
              });
            }
          }
    
          // Update batch in the database
          const result = await postsCollection.updateOne(
            { batch },
            { $set: { department: updatedDepartment } }
          );
    
          res.json({ message: "Student added successfully", result });
        } else {
          // Insert a new batch if it doesn’t exist
          const newBatch = { batch, department };
          const result = await postsCollection.insertOne(newBatch);
          res.json({ message: "New batch created", result });
        }
      } catch (error) {
        console.error("Error creating/updating post:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    

    app.get("/getPosts", async (req, res) => {
      const result = await postsCollection.find().toArray();
      console.log(result);
      res.json(result);
    });

    app.get("/getBatch/:batch", async (req, res) => {
      const batchNumber = parseInt(req.params.batch);
      
      try {
        const batchData = await postsCollection.findOne({ batch: batchNumber });
        
        if (!batchData) {
          return res.status(404).json({ message: "Batch not found" });
        }
    
        res.json(batchData);
      } catch (error) {
        res.status(500).json({ message: "Error fetching batch", error });
      }
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
