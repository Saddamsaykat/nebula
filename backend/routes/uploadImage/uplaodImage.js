const { ObjectId } = require("mongodb");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const express = require("express");
const router = express.Router();

let studentsCollection;

const setDatabase = (db) => {
  studentsCollection = db.collection("students-images");
};

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const imageDocument = {
      name: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    const result = await studentsCollection.insertOne(imageDocument);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully!",
      imageId: result.insertedId,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.get("/:id", async (req, res) => {
    try {
      const imageId = req.params.id;
      const image = await studentsCollection.findOne({ _id: new ObjectId(imageId) });
  
      if (!image) {
        return res.status(404).json({ success: false, message: "Image not found" });
      }
  
      res.set("Content-Type", image.contentType);
      res.send(image.data);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

  // Delated Image
router.delete("/:id", async (req, res) => {
    try {
      const imageId = req.params.id;
      const result = await studentsCollection.deleteOne({ _id: new ObjectId(imageId) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: "Image not found" });
      }
  
      res.status(200).json({ success: true, message: "Image deleted successfully!" });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  

module.exports = { router, setDatabase };
