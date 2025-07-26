const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  className: { type: String, required: true },
  fee: { type: Number, required: true },
  startDate:{type: Date, required: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 👇 This links student to the admin who created them
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  


  // ✅ Fees structure (already correct)
  fees: {
    type: Map,
    of: new Schema({
      amount: Number,
      date: String
    }, { _id: false }),
    default: {}
  }
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
