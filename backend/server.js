const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser to read JSON from frontend

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/tuitionsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mount student routes
app.use("/api/students", require("./routes/students"));

// Start the server
app.listen(5000, () => {
  console.log("🚀 Server is running on http://localhost:5000");
});
