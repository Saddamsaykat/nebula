const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const studentRoutes = require("./routes/students/students.js");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
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

    // Set the database for student routes
    studentRoutes.setDatabase(db);
    app.use("/students", studentRoutes.router);

    // JWT Authentication
    app.post("/jwtAuth", async (req, res) => {
      const user = req.body;
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

    const verifyToken = async (req, res, next) => {
      if (!req?.headers?.authorization) {
        return res.status(401).json({ message: "Unauthorized - No Token" });
      }

      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }
        req.user = decoded;
        next();
      });
    };

    // Fetch Posts
    app.get("/getPosts", async (req, res) => {
      try {
        const result = await postsCollection.find().toArray();
        res.json(result);
      } catch (error) {
        console.error("Database Query Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello ZHSUST");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
