const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  className: { type: String, required: true },
  fee: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // ✅ FIX: Define `fees` properly so MongoDB stores dynamic keys
  fees: {
  type: Map,
  of: new Schema({
    amount: Number,
    date: String  // or Date type
  }, { _id: false }),
  default: {}
}
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
