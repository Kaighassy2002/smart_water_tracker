exports.getWeeklyWaterUsage = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // 7 days including today

    const usage = await Sensor.aggregate([
      {
        $match: {
          timestamp: { $gte: sevenDaysAgo }
        }
      },
      {
        $addFields: {
          flowRateNum: { $toDouble: "$flowRate" }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
          },
          totalUsage: { $sum: "$flowRateNum" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json(usage);
  } catch (error) {
    console.error("Error fetching weekly water usage:", error);
    res.status(500).json({ error: "Failed to fetch weekly usage." });
  }
};