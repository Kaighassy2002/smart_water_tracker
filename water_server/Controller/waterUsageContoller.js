const WaterUsage = require("../Models/waterUsage");
const User = require("../Models/userModel");

// Controller to get daily water usage and simulation details for a user
exports.getDailyWaterUsage = async (req, res) => {
  try {
    // Trim userId in case of newline or whitespace
    const userId = req.query.userId?.trim();

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Validate if user exists using _id
    const user = await User.findById(userId);
    console.log(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found with the provided ID" });
    }

    // Today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find usage where user matches _id and date is today
    const dailyUsage = await WaterUsage.find({
      user: user._id,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    console.log('Daily usage data:', dailyUsage)

    if (!dailyUsage || dailyUsage.length === 0) {
      return res.status(404).json({ message: "No water usage data found for today" });
    }

    res.status(200).json(dailyUsage);
  } catch (error) {
    console.error("Error fetching water usage data:", error);
    res.status(500).json({ message: "An error occurred while fetching water usage data" });
  }
};
