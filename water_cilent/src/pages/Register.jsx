import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Alert,
  Spinner
} from "react-bootstrap";
import { sendOtp, verifyOtp } from "../services/allApi"; 
import "../styles/login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPhoneValid = (phone) => /^[0-9]{10}$/.test(phone);
  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  // Handles OTP sending when user clicks the "Send OTP" button
  const handleSendOtp = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    setError("");
    setResponseMsg("");

    const { email, phone } = formData;

    // Ensure either phone or email is valid
    if (!isPhoneValid(phone) && !isEmailValid(email)) {
      setError("Please enter a valid phone number or email.");
      setLoading(false);
      return;
    }

    try {
      // Send OTP request
      const res = await sendOtp(email); 
      setOtpSent(true); // OTP sent
      setResponseMsg(res.data.message || "OTP sent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Handles registration when user clicks "Register"
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResponseMsg("");

    if (!otp) {
      setError("Please enter the OTP.");
      setLoading(false);
      return;
    }

    try {
      const res = await verifyOtp(formData.email, otp, formData.name);
      localStorage.setItem("token", res.data.token);
      toast.success("Registered successfully!");
    
      // Reset states
      setOtpSent(false);
      setFormData({ name: "", email: "", phone: "" });
      setOtp("");
    
      // Redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000); 
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="login-bg" style={{ minHeight: "100vh" }}>
      <Container className="d-flex justify-content-center align-items-center py-5">
        <div style={{ maxWidth: "500px", width: "100%" }} className="glass-card shadow p-4">
          <Card.Body>
            <h3 className="text-center mb-4">Create Account</h3>

            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Full Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Email Address <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 10-digit number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              {!otpSent && (
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Send OTP"}
                </Button>
              )}

              {otpSent && (
                <>
                  <Form.Group className="mt-3 mb-3">
                    <Form.Label>OTP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="success"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : "Register"}
                  </Button>
                </>
              )}

              {responseMsg && <Alert variant="success" className="mt-3">{responseMsg}</Alert>}
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Form>

            <div className="text-center mt-4">
              <small>
                Already have an account?{" "}
                <a href="/login" className="text-decoration-none">Login here</a>
              </small>
            </div>
          </Card.Body>
        </div>
      </Container>
      <ToastContainer  position='top-center' theme='colored' autoClose={3000}/>
    </div>
    
  );
};

export default Register;
