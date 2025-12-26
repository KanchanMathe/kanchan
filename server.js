const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ text });
    } catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ error: "Failed to generate content from AI" });
    }
});

const PORT = 8080;
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.log("Server Start Error:", err.message);
});