const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const JWT_SECRET = "secret123";  // ⚠️ Use env var in real apps


// 🔐 Admin Signup
router.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  console.log("📩 Signup received:", req.body);

  try {
    const existingUser = await Admin.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      username,
      password: hashedPwd,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// 🔐 Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, userId: user._id, name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
