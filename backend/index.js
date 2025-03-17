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

    // Jwt Authentication
    app.post("/jwtAuth", async (req, res) => {
      const user = req.body;
      // const user = { name: "admin" };
      const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "10h",
      });
      res.send({ token });
    });

    app.get("/jwtAuth", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "10h",
      });
      res.send({ token });
    });

    // const verifyToken = async (req, res, next) => {
    //   console.log(req.headers.authorization);

    //   if (!req?.headers?.authorization) {
    //     return res.status(401).send({ message: "Unauthorized Access Host" });
    //   }
    //   const token = req?.headers?.authorization.split(" ")[1];
    //   jwt.verify(token, process.env.JWT_SECRET, (err, decoder) => {
    //     if (err) {
    //       return res.status(401).send({ message: "Unauthorized Access" });
    //     }
    //     req.user = decoder;
    //     next();
    //   });
    // };

    const verifyToken = async (req, res, next) => {
      console.log("Received Authorization Header:", req.headers.authorization);

      if (!req?.headers?.authorization) {
        return res
          .status(401)
          .json({ message: "Unauthorized Access - No Token Provided" });
      }

      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized Access - Invalid Token Format" });
      }

      jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          console.error("JWT Verification Error:", err);
          return res
            .status(401)
            .json({ message: "Unauthorized Access - Invalid Token" });
        }
        req.user = decoded;
        next();
      });
    };

    // Post collection for registering
    app.post("/createPost", async (req, res) => {
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
            console.warn(
              `Invalid structure for department: ${selectedDepartment}`
            );
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

    app.get("/users", verifyToken, async (req, res) => {
      const allUsers = await postsCollection.find().toArray();
      res.send(allUsers);
      console.log(allUsers);
    });

    // app.get("/getPosts", verifyToken,  async (req, res) => {
    //   const result = await postsCollection.find().toArray();
    //   console.log(result);
    //   res.json(result);
    // });

    app.get("/getPosts", verifyToken, async (req, res) => {
      try {
        const result = await postsCollection.find().toArray();
        console.log("Fetched Posts:", result);
        res.json(result);
      } catch (error) {
        console.error("Database Query Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.get("/getBatch/:batch", async (req, res) => {
      const batchNumber = parseInt(req.params.batch);

      try {
        const batchData = await postsCollection.findOne({
          batch: batchNumber,
        });

        if (!batchData) {
          return res.status(404).json({
            message: "Batch not found",
          });
        }

        res.json(batchData);
      } catch (error) {
        res.status(500).json({
          message: "Error fetching batch",
          error,
        });
      }
    });

    app.delete("/deletePost/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid ID format",
          });
        }
        const query = {
          _id: new ObjectId(id),
        }; // Convert id to ObjectId
        console.log("Query:", query);
        const result = await postsCollection.deleteOne(query);
        res.json(result);
      } catch (error) {
        res.status(500).json({
          error: "Server error",
        });
      }
    });

    app.patch("/getPosts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({
            error: "Invalid ID format",
          });
        }
        const query = {
          _id: new ObjectId(id),
        };
        const update = {
          $set: req.body,
        };
        console.log("Query:", query);
        console.log("Update:", update);
        const result = await postsCollection.updateOne(query, update);
        res.json(result);
      } catch (error) {
        res.status(500).json({
          error: "Server error",
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
