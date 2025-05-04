const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, expires: 600 } // 10 min expiry
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp