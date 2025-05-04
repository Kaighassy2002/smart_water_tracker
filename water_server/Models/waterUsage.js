const mongoose = require("mongoose");

const waterUsageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Reference to the User collection
  date: { type: Date, default: Date.now },
  dailyUsage: { type: Number, required: true }, // Amount of water used (in liters) for the day
  weeklyUsage: { type: Number, required: true }, // Amount of water used (in liters) for the week
  monthlyUsage: { type: Number, required: true }, // Amount of water used (in liters) for the month
});

const WaterUsage = mongoose.model("WaterUsage", waterUsageSchema);

module.exports = WaterUsage;
