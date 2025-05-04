const User = require("../Models/userModel"); // your User model
const Otp = require("../Models/otp");   // temporary OTP model
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
  
});

// STEP 1: Generate and send OTP
exports.generateOtpAndSend = async (req, res) => {
  const { name, email, phone } = req.body;
  console.log('Email:', email);

  try {
    // Check if already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to DB
    await Otp.findOneAndUpdate(
      { email },
      { otp: otpCode, createdAt: new Date() },
      { upsert: true }
    );

    // Send OTP via Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otpCode}. It is valid for 10 minutes.`
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP generation error:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// STEP 2: Verify OTP and Register
exports.verifyOtpAndRegister = async (req, res) => {
  const { name, email, phone, otp } = req.body;
   console.log(req.body);
   
  try {
    const otpRecord = await Otp.findOne({ email });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Optional: delete OTP after use
    await Otp.deleteOne({ email });

    // Register user
    const newUser = await User.create({ name, email, phone });

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.status(200).json({ token, user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};



// Login user using otp and generate jwt token 
// STEP 1: Generate and send OTP
exports.generateOtpLogin = async (req, res) => {
  const { email } = req.body;  // Only email needed

  const normalizedEmail = email.toLowerCase();

  try {
    // Check if the email exists in the database
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store or update the OTP for this email
    await Otp.findOneAndUpdate(
      { email: normalizedEmail },
      { otp: otpCode, createdAt: new Date() },
      { upsert: true }
    );

    // Send OTP to the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: normalizedEmail,
      subject: "Your OTP Code",
      text: `Your OTP is ${otpCode}. It is valid for 10 minutes.`
    });

    // Respond with success
    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP generation error:", err);
    res.status(500).json({ message: "Error sending OTP" });
  }
};


// STEP 2: Verify OTP and Generate JWT Token
exports.verifyOtpAndLogin = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const otpRecord = await Otp.findOne({ email: normalizedEmail });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found for this email" });
    }

    const otpExpired = new Date() - new Date(otpRecord.createdAt) > 10 * 60 * 1000;
    if (otpRecord.otp !== otp || otpExpired) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await Otp.deleteOne({ email: normalizedEmail });

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};