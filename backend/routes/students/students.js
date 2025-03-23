const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

// MongoDB collection setup (Passed from main server file)
let studentsCollection;
const setDatabase = (db) => {
  studentsCollection = db.collection("students");
};

// Get all students
router.get("/", async (req, res) => {
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
      email,
      number,
      presentAddress,
      permanentAddress,
      whatsUp,
      facebook,
      linkedin,
      github,
      aboutYour,
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
      email,
      number,
      presentAddress,
      permanentAddress,
      whatsUp,
      facebook,
      linkedin,
      github,
      aboutYour,
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
