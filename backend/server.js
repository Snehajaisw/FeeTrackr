require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser to read JSON from frontend
app.use("/api/auth", require("./routes/auth"));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Mount student routes
app.use("/api/students", require("./routes/students"));

// Start the server
app.listen(5000, () => {
  console.log("🚀https://feetrackr-backend.onrender.com");
});
