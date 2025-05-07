import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

import { Card, Container } from "react-bootstrap";
import { weekilyWaterData } from "../services/allApi";

const WeeklyUsageChart = () => {
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const loadUsage = async () => {
      try {
        const res = await weekilyWaterData();
        setWeeklyData(res.data.map(item => ({
          date: item._id,
          usage: item.totalUsage.toFixed(2)
        })));
      } catch (err) {
        console.error("Failed to fetch weekly usage:", err);
      }
    };

    loadUsage();
  }, []);

  return (
    <Container className="my-4">
      <Card className="p-3 shadow-sm rounded-4">
        <h4 className="text-center mb-3">Weekly Water Usage</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#3C6E71" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default WeeklyUsageChart;
