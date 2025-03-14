const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const port = process.env.port || 5000;

// middleware
app.use(cors());
app.use(express.json());

// JWT Middleware
// function verifyJWT(req, res, next) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: "Authorization token is required" });
//   }

//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }

//     req.user = decoded; // Attach user information to request
//     next();
//   });
// }


const {
  MongoClient,
  ServerApiVersion,
  ObjectId
} = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jceqwtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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

    // Post collection for registering
    app.post('/createPost', async (req, res) => {
      try {
        const { batch, department } = req.body;
    
        if (!batch || !department) {
          return res.status(400).json({
            message: "Batch and department are required.",
          });
        }
    
        let batchData = await postsCollection.findOne({ batch });
        if (!batchData) {
          batchData = { batch, department: {} };
        }
    
        for (const selectedDepartment in department) {
          const newStudents = department[selectedDepartment];
    
          if (!newStudents || !Array.isArray(newStudents)) {
            console.warn(`Invalid structure for department: ${selectedDepartment}`);
            continue; // Skip invalid department
          }
    
          if (!batchData.department[selectedDepartment]) {
            batchData.department[selectedDepartment] = [];
          }
    
          newStudents.forEach((student) => {
            if (!student.email) {
              console.error("Invalid student entry:", student);
              return; // Skip invalid student
            }
            const isDuplicate = batchData.department[selectedDepartment].some(
              (existingStudent) => existingStudent.email === student.email
            );
    
            if (!isDuplicate) {
              batchData.department[selectedDepartment].push(student);
            }
          });
        }
    
        const result = await postsCollection.updateOne(
          { batch },
          { $set: { department: batchData.department } },
          { upsert: true }
        );
        console.log("Update result:", result);
    
        res.status(200).json({
          message: "Students added successfully!",
          data: batchData,
        });
      } catch (error) {
        console.error("Error processing /createPost:", error);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
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
        const batchData = await postsCollection.findOne({
          batch: batchNumber
        });

        if (!batchData) {
          return res.status(404).json({
            message: "Batch not found"
          });
        }

        res.json(batchData);
      } catch (error) {
        res.status(500).json({
          message: "Error fetching batch",
          error
        });
      }
    });


    app.delete("/deletePost/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid ID format"
          });
        }
        const query = {
          _id: new ObjectId(id)
        }; // Convert id to ObjectId
        console.log("Query:", query);
        const result = await postsCollection.deleteOne(query);
        res.json(result);
      } catch (error) {
        res.status(500).json({
          error: "Server error"
        });
      }
    });

    app.patch("/getPosts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid ID format"
          });
        }
        const query = {
          _id: new ObjectId(id)
        };
        const update = {
          $set: req.body
        };
        console.log("Query:", query);
        console.log("Update:", update);
        const result = await postsCollection.updateOne(query, update);
        res.json(result);
      } catch (error) {
        res.status(500).json({
          error: "Server error"
        });
      }
    });

    console.log("Connected to MongoDB");
    await client.db("admin").command({
      ping: 1,
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {}
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello ZHSUST");
});

app.listen(port, () => {
  console.log(`Server Is running ${port}`);
});