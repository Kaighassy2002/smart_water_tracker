const Sensor = require("../Models/sensor");

// Simulate sensor data
const generateSensorData = () => ({
  temperature: (Math.random() * 40 + 10).toFixed(2),
  flowRate: (Math.random() * 20 + 1).toFixed(2),
  pressure: (Math.random() * 5 + 1).toFixed(2),
  timestamp: new Date(),
});

// Save simulated data to MongoDB
exports.getSensorData = async (req, res) => {
  try {
    const data = generateSensorData();
    const newSensor = new Sensor(data);
    const saved = await newSensor.save();

    res.status(200).json(saved);
  } catch (error) {
    console.error("Failed to save sensor data:", error);
    res.status(500).json({ error: "Error saving sensor data." });
  }
};

// Get all data or limit by query
exports.getAllSensorData = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const sensors = await Sensor.find().sort({ timestamp: 1 }).limit(limit);
    res.status(200).json(sensors.reverse()); // chronological order
  } catch (err) {
    console.error("Error fetching sensor history:", err);
    res.status(500).json({ error: "Error fetching data." });
  }
};


