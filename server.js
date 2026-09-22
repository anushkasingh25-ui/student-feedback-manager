// // 1. dotenv को सबसे पहले लोड करें
// require('dotenv').config();

// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// app.use(express.json());
// app.use(express.static("public"));

// const Feedback = require("./models/Feedback");

// // 2. यहाँ हमने MONGODB_URI को बदलकर MONGO_URI कर दिया है जो आपकी .env फ़ाइल से मैच करता है
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected successfully!");
//   })
//   .catch((error) => {
//     console.log("MongoDB connection error:", error.message);
//   });

// app.get("/api/test", (req, res) => {
//   res.json({
//     message: "Server is working!"
//   });
// });

// app.post("/api/feedback", async (req, res) => {
//   try {
//     const { name, rating, comment } = req.body;

//     const feedback = new Feedback({
//       name: name,
//       rating: rating,
//       comment: comment
//     });

//     await feedback.save();

//     res.status(201).json({
//       message: "Feedback saved successfully!",
//       feedback: feedback
//     });
//   } catch (error) {
//     console.log("Error saving feedback:", error.message);
//     res.status(500).json({
//       message: "Failed to save feedback"
//     });
//   }
// });

// app.get("/api/feedback", async (req, res) => {
//   try {
//     const feedback = await Feedback.find();
//     res.json(feedback);
//   } catch (error) {
//     console.log("Error fetching feedback:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch feedback"
//     });
//   }
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



// 1. dotenv को सबसे पहले लोड करें
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// यहाँ हम मॉडल का नाम और पाथ सुरक्षित तरीके से इम्पोर्ट कर रहे हैं
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

// एरर को सीधे ब्राउज़र और टर्मिनल दोनों पर प्रिंट करने के लिए अपडेटेड रूट
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
    // यह आपके VS Code के टर्मिनल में एरर का पूरा सच दिखाएगा
    console.error("======> TERMINAL POST ERROR:", error);
    
    // यह सीधे ब्राउज़र की स्क्रीन पर एरर दिखाएगा ताकि आपको अंदाज़ा न लगाना पड़े
    res.status(500).json({
      message: "Failed to save feedback. Detail: " + error.message
    });
  }
});

// एरर को सीधे टर्मिनल पर प्रिंट करने के लिए अपडेटेड रूट
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
