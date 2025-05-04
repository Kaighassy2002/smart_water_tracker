const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const waterUsageController = require('../Controller/waterUsageContoller');
const sensorController = require('../Controller/sensorController');

// User OTP-based Registration
router.post('/register/send-otp', userController.generateOtpAndSend);
router.post('/register/verify-otp', userController.verifyOtpAndRegister);

// User OTP-based Login
router.post('/login/send-otplogin', userController.generateOtpLogin);
router.post('/login/verify-otplogin', userController.verifyOtpAndLogin);

// Sensor Data
router.get('/sensor-data', sensorController.getSensorData);
router.get('/sensor-data/history', sensorController.getAllSensorData);

// ✅ Water Usage - Daily Usage Fetch (with simulation)
router.get('/water-usage/daily', waterUsageController.getDailyWaterUsage);

module.exports = router;
