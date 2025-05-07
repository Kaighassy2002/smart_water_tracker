import { commonAPI } from "./commonApi";
import { SERVER_URL } from "./serverURL";

// Send OTP (for phone or email)
export const sendOtp = async (email) => {
  return await commonAPI("POST", `${SERVER_URL}/register/send-otp`, { email });
};

// Verify OTP and Register user (after receiving OTP)
export const verifyOtp = async (email, otp, name) => {
  return await commonAPI("POST", `${SERVER_URL}/register/verify-otp`, { email, otp, name });
};

// 🔹 Send OTP for login
export const sendOtpLogin = async (email) => {
    return await commonAPI("POST", `${SERVER_URL}/login/send-otplogin`, { email });
  };
  
  // 🔹 Verify OTP and login user
  export const verifyOtpLogin = async (email, otp) => {
    return await commonAPI("POST", `${SERVER_URL}/login/verify-otplogin`, { email, otp });
  };

 
  export const fetchSensorData = async () => {
    return await commonAPI("GET", `${SERVER_URL}/sensor-data`);
    
  };
  // ✅ Sensor history data (latest 20 entries or use query param)
export const fetchSensorHistory = async (limit = 20) => {
  return await commonAPI("GET", `${SERVER_URL}/sensor-data/history?limit=${limit}`);
};

  export const weekilyWaterData = async () => {
    return await commonAPI("GET", `${SERVER_URL}/sensor-data/weekly-usage`);
  };
