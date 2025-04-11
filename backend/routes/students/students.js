const express = require("express");
const {
  ObjectId
} = require("mongodb");
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
    return res.status(401).json({
      message: "Unauthorized - No Token"
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Token"
      });
    }
    req.user = decoded;
    next();
  });
};

// Get all students
router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await studentsCollection.find().toArray();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

// Add Student API (Checks Email & Saves Data)
router.post("/", async (req, res) => {
  try {
    const {
      batch,
      department,
      firstName,
      lastName,
      email,
      number,
      gender,
      presentAddress,
      permanentAddress,
      whatsUp,
      facebook,
      linkedin,
      github,
      aboutYour,
      image,
      role,
      studentId,
      country,
      city,
      agree,
    } = req.body;

    // Validate required fields
    if (!batch || !department || !firstName || !email || !number) {
      return res.status(400).json({
        message: "Missing required fields!"
      });
    }

    // Check if email already exists in any department
    const emailExists = await studentsCollection.findOne({
      $expr: {
        $gt: [{
            $size: {
              $filter: {
                input: {
                  $objectToArray: "$department"
                },
                as: "dept",
                cond: {
                  $in: [email, "$$dept.v.email"]
                },
              },
            },
          },
          0,
        ],
      },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists!"
      });
    }

    const batchData = await studentsCollection.findOne({
      batch
    });

    const studentData = {
      firstName,
      lastName,
      email,
      number,
      gender,
      presentAddress,
      permanentAddress,
      whatsUp,
      facebook,
      linkedin,
      github,
      aboutYour,
      image,
      role,
      studentId,
      country,
      city,
      agree,
      batch,
      department
    };

    if (!batchData) {
      // Create a new batch entry
      await studentsCollection.insertOne({
        batch,
        department: {
          [department]: [studentData]
        },
      });
    } else {
      // Update existing batch with new student
      await studentsCollection.updateOne({
        batch
      }, {
        $push: {
          [`department.${department}`]: studentData
        }
      });
    }

    res.status(201).json({
      message: "Student added successfully!"
    });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});



router.patch("/", async (req, res) => {
  try {
    const {
      ...updateFields
    } = req.body;
    const batch = updateFields.batch;
    const department = updateFields.department;
    const studentId = updateFields.studentId;
    console.log(batch, department, studentId, updateFields);
    // Validate required fields
    if (!batch || !department || !studentId) {
      return res.status(400).json({
        message: "Missing required fields!"
      });
    }

    // Add `updatedAt` timestamp
    if (updateFields) {
      updateFields.updatedAt = new Date();
    }

    const result = await studentsCollection.updateOne({
      batch
    }, {
      $set: {
        [`department.${department}.$[student]`]: updateFields,
      },
    }, {
      arrayFilters: [{
        "student.studentId": studentId
      }],
    });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({
          message: "Student not found or no changes made."
        });
    }

    res.status(200).json({
      message: "Student updated successfully!"
    });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});




// Delated
router.delete('/', async (req, res) => {
  try {
    const {
      batch,
      department,
      studentId
    } = req.body;
    if (!batch || !department || !studentId) {
      return res.status(400).json({
        message: "Missing required fields!"
      });
    }

    const updatedStudent = await studentsCollection.findOneAndUpdate({
      batch
    }, {
      $pull: {
        [`department.${department}`]: {
          studentId
        }
      }
    }, {
      returnOriginal: false
    });

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found!"
      });
    }

    res.json({
      message: "Student deleted successfully!"
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});


module.exports = {
  router,
  setDatabase
};