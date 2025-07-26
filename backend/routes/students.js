const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const verifyToken = require("../middleware/authMiddleware");

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// ✅ GET students for logged-in admin
router.get("/", verifyToken, async (req, res) => {
  console.log("👀 Admin ID:", req.adminId);
  try {
    const students = await Student.find({ adminId: req.adminId });

    const plainStudents = students.map((s) => {
      const plain = s.toObject();
      plain.fees = Object.fromEntries(s.fees);
      return plain;
    });

    res.json({ students: plainStudents });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// ✅ POST: Add student
router.post("/", verifyToken, async (req, res) => {
  console.log("👀 Admin ID:", req.adminId);
  try {
    const { name, phone, className, fee, startDate,username, password } = req.body;

    const defaultFees = new Map();
    months.forEach((month) => {
      defaultFees.set(month, { amount: 0, date: null });
    });

    const student = new Student({
      name,
      phone,
      className,
      fee,
      startDate,
      username,
      password,
      adminId: req.adminId,
      fees: defaultFees
    });

    const saved = await student.save();
    const plainStudent = saved.toObject();
    plainStudent.fees = Object.fromEntries(saved.fees);
    res.status(201).json({ student: plainStudent });

  } catch (err) {
    res.status(400).json({ message: "Failed to add student", error: err.message });
  }
});

// ✅ DELETE student
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      _id: req.params.id,
      adminId: req.adminId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete student" });
  }
});

// ✅ PUT: Update fees
router.put("/:id/fees", verifyToken, async (req, res) => {
  const { month, amount } = req.body;

  try {
    const student = await Student.findOne({
      _id: req.params.id,
      adminId: req.adminId
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found or unauthorized" });
    }

    if (!(student.fees instanceof Map)) {
      student.fees = new Map(Object.entries(student.fees || {}));
    }

    student.fees.set(month, {
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10)
    });

    const saved = await student.save();
    res.json({ student: saved });
  } catch (err) {
    res.status(500).json({ message: "Failed to update fees" });
  }
});

module.exports = router;
