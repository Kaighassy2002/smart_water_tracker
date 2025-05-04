import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import '../styles/home.css'; 
import water from "../assets/image/1d9.png"

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="homepage-bg">
      <Header/>
      <Container fluid className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Row className="text-center align-items-center justify-content-center w-100">
          <Col xs={12} md={6} className="mb-4">
            <div className="glass-box p-4">
              <h1 className="display-3 text-white fw-bold">Smart Water Tracker</h1>
              <p className="lead text-light">Track your water usage and help conserve Earth's most precious resource.</p>
              <Button variant="light" size="lg" className="mt-3 px-5 py-2 shadow" onClick={handleGetStarted}>
                Get Started
              </Button>
            </div>
          </Col>

          <Col xs={12} md={1} className="d-none d-md-flex justify-content-center">
            <div className="vertical-line"></div>
          </Col>

          <Col xs={12} md={5} className="d-flex justify-content-center align-items-center mb-4">
            <img
              src={water}
              alt="Water Illustration"
              className="img-fluid animated-drop rounded"
              style={{ maxHeight: '300px' }}
            />
          </Col>
        </Row>

        <Row className="mt-5 text-center">
          <Col>
            <p className="text-light fw-medium">Join us in the mission to conserve water and protect our planet.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
