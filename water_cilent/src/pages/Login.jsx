import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtpLogin, verifyOtpLogin } from '../services/allApi';
import { useAuth } from '../context/AuthContext';  
import '../styles/login.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleSendOtp = async () => {
    setError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSendingOtp(true);
      const res = await sendOtpLogin(email);
      if (res.data.message === 'OTP sent to email') {
        setOtpSent(true);
        toast.success('OTP sent successfully!');
      } else {
        setError(res.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Error sending OTP');
      console.error(err);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }

    try {
      setIsVerifyingOtp(true);
      const res = await verifyOtpLogin(email, otp);
      
      if (res.data.token && res.data.user) {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        login(res.data.token, res.data.user);  
        toast.info('Login successful!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setError('OTP verification failed');
      }
    } catch (err) {
      setError('Error verifying OTP');
      console.error(err);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="container-fluid mt-5">
        <Link to={"/"} style={{ textDecoration: "none" }} className="fw-bolder text-white fs-5">
          <i className="fa-solid fa-arrow-left-long"></i> Back to Home
        </Link>
      </div>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="glass-card p-4">
          <h3 className="text-center text-white mb-4">Login with OTP</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={otpSent}
            />
          </div>

          {!otpSent && (
            <button className="btn btn-primary w-100 mb-3" onClick={handleSendOtp} disabled={isSendingOtp}>
              {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
            </button>
          )}

          {otpSent && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                />
              </div>
              <button
                className="btn btn-success w-100 mb-3"
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp}
              >
                {isVerifyingOtp ? 'Verifying...' : 'Verify & Login'}
              </button>
            </>
          )}

          <div className="text-center mt-3">
            <p className="text-light">
              Don't have an account?{' '}
              <a href="/register" className="text-info fw-bold">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
     <ToastContainer  position='top-center' theme='colored' autoClose={3000}/>
      
    </div>
  );
};

export default Login;
