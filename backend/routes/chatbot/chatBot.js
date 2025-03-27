const express = require('express');
const https = require('https');
require("dotenv").config();
const { MongoClient } = require("mongodb");

const CHAT_ENV_KEY = process.env.RAPIDAPI_KEY;
const router = express.Router();

let db;  // MongoDB Database reference

// Set the database in your chatbot module
router.setDatabase = (database) => {
  db = database;
};

// Route to handle chat messages
router.post('/', async (req, res) => {
    const userText = req.body.text;  // The text from the user
    
    // ChatGPT API options
    const options = {
        method: 'POST',
        hostname: 'chatgpt-42.p.rapidapi.com',
        port: null,
        path: '/',
        headers: {
            'x-rapidapi-key': CHAT_ENV_KEY,
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
    };

    const apiReq = https.request(options, (apiRes) => {
        const chunks = [];

        apiRes.on('data', (chunk) => chunks.push(chunk));
        apiRes.on('end', async () => {
            const body = Buffer.concat(chunks).toString();

            // Save the chat conversation to MongoDB
            try {
                const chatCollection = db.collection('chats');
                const chatData = {
                    userText: userText,
                    botResponse: body,
                    timestamp: new Date(),
                };

                await chatCollection.insertOne(chatData);  // Store chat data in MongoDB

                res.status(apiRes.statusCode).send(body);
            } catch (error) {
                console.error("Error inserting chat message into MongoDB:", error);
                res.status(500).send("Error storing chat message.");
            }
        });
    });

    apiReq.write(JSON.stringify({ text: req.body.text }));
    apiReq.end();
});

module.exports = router;
