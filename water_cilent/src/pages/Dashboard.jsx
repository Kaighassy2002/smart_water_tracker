import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";

import FlowChart from "./FlowChart"; // Import FlowChart component
import SensorChart from "./SensorChart"; // Import SensorChart for live data
import Chart from "./Charts"; // Import Chart for weekly data

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("name") || "User";
  const [simulationStatus, setSimulationStatus] = useState(false);
  const [sensorData, setSensorData] = useState(null);
  const [activeComponent, setActiveComponent] = useState("sensor");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleStartSimulation = async () => {
    try {
      if (!simulationStatus) {
        // Start simulation
        const response = await axios.get("http://localhost:5000/api/sensor-data"); // Update the endpoint as needed
        setSensorData(response.data);
        setSimulationStatus(true);
      } else {
        // Stop simulation
        setSensorData(null);
        setSimulationStatus(false);
      }
    } catch (err) {
      console.error("Failed to fetch sensor data", err);
      alert("An error occurred while starting the simulation. Please try again.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Header />
      <Container fluid className="py-4 px-3">
        <div className="d-flex justify-content-end mb-3">
          <Button variant="outline-danger" onClick={handleLogout} className="d-flex align-items-center gap-2">
            <i className="fas fa-sign-out-alt"></i>
            <span className="d-none d-md-inline">Logout</span>
          </Button>
        </div>

        <div className="text-center mb-4">
          <h2 className="fw-bold">Welcome, {userName}!</h2>
          <p className="text-muted">Here's your Smart Water Dashboard</p>
        </div>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-chart-line me-2 text-primary fs-4"></i>
                    <Card.Title className="mb-0">Live Water Usage</Card.Title>
                  </div>
                  <Card.Text className="text-muted">
                    Visualize real-time data coming from sensor simulators.
                  </Card.Text>
                </div>
                <ButtonGroup className="mt-3">
                  <Button 
                    variant="primary" 
                    onClick={() => setActiveComponent("sensor")} 
                    className="me-2"
                  >
                    Live Sensor Data
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={() => setActiveComponent("chart")}
                  >
                    View Weekly Usage
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="h-100 border-0 shadow-sm rounded-4">
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-project-diagram me-2 text-success fs-4"></i>
                    <Card.Title className="mb-0">Flowchart Editor</Card.Title>
                  </div>
                  <Card.Text className="text-muted">
                    Design and manage your water usage flow using draggable nodes.
                  </Card.Text>
                </div>
                <Button variant="success" onClick={() => setActiveComponent("flowchart")} className="mt-3">
                  <i className="fas fa-pencil-alt me-2"></i>Open Flowchart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Conditionally render components */}
        {activeComponent === "sensor" && (
          <SensorChart data={sensorData} simulationStatus={simulationStatus} handleStartSimulation={handleStartSimulation} />
        )}
        {activeComponent === "chart" && <Chart />} {/* This will show weekly data */}
        {activeComponent === "flowchart" && <FlowChart />}
      </Container>
    </div>
  );
};

export default Dashboard;
