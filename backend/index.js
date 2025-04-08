import cookieParser from "cookie-parser";
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const studentRoutes = require("./routes/students/students.js");
const uploadImage = require("./routes/uploadImage/uplaodImage.js");
const chatbot = require("./routes/chatbot/chatBot.js");
app.use(cookieParser());
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
    // await client.connect();

    const db = client.db("zhsust_alumni");
    const postsCollection = db.collection("department");

    // Set the database for student routes
    studentRoutes.setDatabase(db);
    app.use("/students", studentRoutes.router);
    // Set the database for image upload routes
    uploadImage.setDatabase(db);
    app.use("/upload-image", uploadImage.router);

    // JWT Authentication
    // app.post("/jwtAuth", async (req, res) => {
    //   const user = req.body;
    //   const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
    //     expiresIn: "10h",
    //   });
    //   res.send({ token });
    // });

    app.post("/jwtAuth", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "10h",
      });
    
      res.cookie("Token", token, {
        httpOnly: true,        // 🛡 Prevents JavaScript access
        secure: true,          // 🔒 Sends only over HTTPS
        sameSite: "Strict",    // 🚫 Helps protect against CSRF
        maxAge: 10 * 60 * 60 * 1000, // 10 hours
      });
    
      res.send({ success: true });
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
