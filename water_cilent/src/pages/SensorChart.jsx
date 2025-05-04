import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button, Container, Card } from "react-bootstrap";
import { fetchSensorData } from "../services/allApi"; // Assuming this function is correctly implemented

const SensorChart = () => {
  const [data, setData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Fetching the sensor data from the API
  const fetchData = async () => {
    try {
      const response = await fetchSensorData();
      const newEntry = response.data; // Assuming response.data is an object containing { time, value }
      
      // Update the data state (limit to the last 20 entries)
      setData((prevData) => [...prevData.slice(-19), newEntry]); 
    } catch (err) {
      console.error("Error fetching sensor data", err);
    }
  };

  // Start streaming the data every 2 seconds
  const startStreaming = () => {
    if (!isStreaming) {
      const id = setInterval(fetchData, 2000); // Call fetchData every 2 seconds
      setIntervalId(id);
      setIsStreaming(true);
    }
  };

  // Stop streaming the data
  const stopStreaming = () => {
    clearInterval(intervalId);
    setIsStreaming(false);
  };

  // Clean up the interval when the component is unmounted
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <Container className="my-4">
      <Card className="shadow-sm rounded-4 p-3">
        <h4 className="text-center mb-3">Live Water Sensor Data</h4>
        <div className="d-flex justify-content-center mb-3 gap-3">
          <Button onClick={startStreaming} disabled={isStreaming} variant="success">
            Start Simulation
          </Button>
          <Button onClick={stopStreaming} disabled={!isStreaming} variant="danger">
            Stop Simulation
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3C6E71" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default SensorChart;
