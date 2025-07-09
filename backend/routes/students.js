const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// ✅ Months list
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// ✅ GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    console.log("📦 Students sent to frontend:", JSON.stringify(students, null, 2));
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// ✅ POST add new student with default fees
router.post("/", async (req, res) => {
  try {
    // Step 1: Initialize fees as a Map
    const defaultFees = new Map();
    months.forEach((month) => {
      defaultFees.set(month, { amount: 0, date: null });
    });

    // Step 2: Create student
    const student = new Student({
      ...req.body,
      fees: defaultFees
    });

    const saved = await student.save();
    console.log("✅ New student added:", saved);
    const plainStudent = saved.toObject();
   plainStudent.fees = Object.fromEntries(saved.fees);
    res.status(201).json({ student: plainStudent });

  } catch (err) {
    console.error("❌ Error adding student:", err.message);
    res.status(400).json({ message: "Failed to add student", error: err.message });
  }
});

// ✅ DELETE student by ID
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete student" });
  }
});

// ✅ PUT update monthly fee + date
router.put("/:id/fees", async (req, res) => {
  const { month, amount } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Convert to Map if not already
    if (!(student.fees instanceof Map)) {
      student.fees = new Map(Object.entries(student.fees || {}));
    }

    student.fees.set(month, {
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10)  // format: YYYY-MM-DD
    });

    const saved = await student.save();
    res.json({ student: saved });
  } catch (err) {
    console.error("❌ Fee update error:", err);
    res.status(500).json({ message: "Failed to update fees" });
  }
});

module.exports = router;
