import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from "recharts";

import { weekilyWaterData } from "../services/allApi";
const Charts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await weekilyWaterData(); 
        setData(response.data || []);
      } catch (err) {
        setError("Failed to fetch water usage data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="py-4">
      <Card className="p-3 shadow-sm">
        <h3 className="text-center mb-4">Your Weekly Water Usage</h3>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis
              label={{
                value: "Water Usage (Liters)",
                angle: -90,
                position: "insideLeft"
              }}
            />
            <Tooltip
              formatter={(value) => `${value} Liters`}
              labelFormatter={(label) => `Week: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="usage"
              stroke="#007bff"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              name="Water Usage"
            />
          </LineChart>
        </ResponsiveContainer>
        

        )}
      </Card>
    </Container>
  );
};

export default Charts;
