
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));


const Feedback = require("./models/Feedback");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});


app.post("/api/feedback", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;

    const feedback = new Feedback({
      name: name,
      rating: rating,
      comment: comment
    });

    await feedback.save();

    res.status(201).json({
      message: "Feedback saved successfully!",
      feedback: feedback
    });
  } catch (error) {
    
    console.error("======> TERMINAL POST ERROR:", error);
    
    
    res.status(500).json({
      message: "Failed to save feedback. Detail: " + error.message
    });
  }
});


app.get("/api/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (error) {
    console.error("======> TERMINAL GET ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch feedback. Detail: " + error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
