const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.post("/getResponse", async (req, res) => {
  try {
    const question = req.body.question;
    console.log("Received question:", question);

    const genAI = new GoogleGenerativeAI("AIzaSyA7n5AQkuX0-47k7dhpr4UYhBbC-JQcH4Y");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);
    const responseText = result.response.text();

    console.log("AI response:", responseText);
    res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;