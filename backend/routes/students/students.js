// router
const express = require('express');
const router = express.Router();

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