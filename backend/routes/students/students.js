// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = 5000;
// const SECRET_KEY = "your_secret_key"; // Change this to a strong secret

// app.use(cors());
// app.use(bodyParser.json());


const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

const dataFile = "students.json";

const loadStudents = () => {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile));
};

// Save students to file
const saveStudents = (students) => {
  fs.writeFileSync(dataFile, JSON.stringify(students, null, 2));
};


// Add Student API (Checks Email & Saves Data)
app.post("/students", (req, res) => {
  const students = loadStudents();
  const { batch, department, name, email, number, presentAddress, permanentAddress } = req.body;

  // Check if email exists across all departments
  const emailExists = students.some((student) =>
    Object.values(student.department).flat().some((s) => s.email === email)
  );

  if (emailExists) {
    return res.status(400).json({ message: "Email already exists!" });
  }

  let studentIndex = students.findIndex((s) => s.batch === batch);
  if (studentIndex === -1) {
    // Create a new batch if not found
    students.push({
      _id: Date.now().toString(),
      batch,
      department: { [department]: [{ name, email, number, presentAddress, permanentAddress }] },
    });
  } else {
    // Add to existing batch
    if (!students[studentIndex].department[department]) {
      students[studentIndex].department[department] = [];
    }
    students[studentIndex].department[department].push({ name, email, number, presentAddress, permanentAddress });
  }

  saveStudents(students);
  res.status(201).json({ message: "Student added successfully!" });
});

