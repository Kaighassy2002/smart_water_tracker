const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  temperature: Number,
  flowRate: Number,
  pressure: Number,
});

module.exports = mongoose.model("Sensor", sensorSchema);
