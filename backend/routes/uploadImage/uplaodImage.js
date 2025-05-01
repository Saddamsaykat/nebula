const { ObjectId } = require("mongodb");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
let studentsCollection;

const verifyToken = async (req, res, next) => {
  if (!req?.headers?.authorization) {
    return res.status(401).json({
      message: "Unauthorized - No Token",
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized - Invalid Token",
      });
    }
    req.user = decoded;
    next();
  });
};

const setDatabase = (db) => {
  studentsCollection = db.collection("students-images");
};

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
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

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await studentsCollection.findOne({
      _id: new ObjectId(imageId),
    });

    if (!image || !image.data || !image.contentType) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    res.set("Content-Type", image.contentType);
    res.send(image.data.buffer ? Buffer.from(image.data.buffer) : image.data);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const images = await studentsCollection.find().toArray();
    console.log(images);
    res.send({ success: true, images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send({ success: false, message: "Failed to fetch images" });
  }
});

// Update Image by put
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const imageId = req.params.id;
    const file = req.file;

    if (!ObjectId.isValid(imageId)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await studentsCollection.updateOne(
      { _id: new ObjectId(imageId) },
      {
        $set: {
          name: file.originalname,
          data: file.buffer,
          contentType: file.mimetype,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    res.status(200).json({ success: true, message: "Image updated successfully!" });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


// Delated Image
router.delete("/:id", async (req, res) => {
  try {
    const imageId = req.params.id;
    const result = await studentsCollection.deleteOne({
      _id: new ObjectId(imageId),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Image deleted successfully!" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = { router, setDatabase };
