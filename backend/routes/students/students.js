const express = require("express");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

// MongoDB collection setup (Passed from main server file)
let studentsCollection;
const setDatabase = (db) => {
  studentsCollection = db.collection("students");
};


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

// Get all students
router.get("/", verifyToken ,async (req, res) => {
  try {
    const students = await studentsCollection.find().toArray();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add Student API (Checks Email & Saves Data)
router.post("/", async (req, res) => {
  try {
    const {
      batch,
      department,
      name,
      lastName,
      email,
      number,
      presentAddress,
      permanentAddress,
      whatsUp,
      facebook,
      linkedin,
      github,
      aboutYour,
      image,
      role,
      studentId
    } = req.body;

    // Validate required fields
    if (!batch || !department || !name || !email || !number) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Check if email already exists in any department
    const emailExists = await studentsCollection.findOne({
      $expr: {
        $gt: [
          {
            $size: {
              $filter: {
                input: { $objectToArray: "$department" },
                as: "dept",
                cond: { $in: [email, "$$dept.v.email"] },
              },
            },
          },
          0,
        ],
      },
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Check if batch exists
    const batchData = await studentsCollection.findOne({ batch });

    const studentData = {
      name,
      lastName,
      email,
      number,
      presentAddress,
      permanentAddress,
      whatsUp,
      facebook,
      linkedin,
      github,
      aboutYour,
      image,
      role,
      studentId
    };

    if (!batchData) {
      // Create a new batch entry
      await studentsCollection.insertOne({
        batch,
        department: { [department]: [studentData] },
      });
    } else {
      // Update existing batch with new student
      await studentsCollection.updateOne(
        { batch },
        { $push: { [`department.${department}`]: studentData } }
      );
    }

    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { router, setDatabase };
