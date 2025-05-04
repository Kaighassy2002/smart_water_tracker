import React, { createContext, useState, useEffect, useContext } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state for token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    
    // Ensure the userData is not 'undefined' or invalid JSON
    if (userData && userData !== "undefined") {
      try {
        return JSON.parse(userData); // Parse if it's valid
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        return null; // Fallback to null if parsing fails
      }
    }
    return null; // If 'user' is 'undefined' or not set, fallback to null
  });

  // Effect to update localStorage whenever user data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store valid user data
    }
  }, [user]);

  // Login function to store token and user in state and localStorage
  const login = (jwtToken, userData) => {
    setToken(jwtToken);
    setUser(userData);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData)); // Store user info
  };

  // Logout function to clear token and user from state and localStorage
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Return the context provider with necessary values
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};
