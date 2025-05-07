import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button, Container, Card } from "react-bootstrap";
import socket from "../services/socket"; 
import { fetchSensorHistory } from "../services/allApi"; 

const SensorChart = () => {
  const [data, setData] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  // Load historical data on mount
  const loadInitialHistory = async () => {
    try {
      const response = await fetchSensorHistory(20);
      const formatted = response.data.map(item => ({
        ...item,
        time: new Date(item.timestamp).toLocaleTimeString(),
      }));
      setData(formatted);
    } catch (error) {
      console.error("Failed to load history:", error);
    }
  };

  useEffect(() => {
    loadInitialHistory();
  }, []);

  useEffect(() => {
    if (isStreaming) {
      socket.on("sensor-data", (incoming) => {
        // Ensure the data format is correct
        if (!incoming || !incoming.value || !incoming.timestamp) {
          console.error("Invalid data received from socket:", incoming);
          return;
        }

        const newEntry = {
          value: parseFloat(incoming.value),
          time: new Date(incoming.timestamp).toLocaleTimeString(),
        };

        // Append new data to the existing data
        setData((prev) => [...prev.slice(-19), newEntry]);
      });
    } else {
      socket.off("sensor-data");
    }

    return () => socket.off("sensor-data");
  }, [isStreaming]);

  return (
    <Container className="my-4">
      <Card className="shadow-sm rounded-4 p-3">
        <h4 className="text-center mb-3">Live Water Sensor Data</h4>
        <div className="d-flex justify-content-center mb-3 gap-3">
          <Button
            onClick={() => setIsStreaming(true)}
            disabled={isStreaming}
            variant="success"
          >
            Start Streaming
          </Button>
          <Button
            onClick={() => setIsStreaming(false)}
            disabled={!isStreaming}
            variant="danger"
          >
            Stop Streaming
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3C6E70" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default SensorChart;
