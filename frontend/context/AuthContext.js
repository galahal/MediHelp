import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [token, setToken] = useState(null); // Store JWT token
  const navigate = useNavigate();

  // Function to log in
  const login = (token) => {
    const decodedToken = jwtDecode(token); // Decode token to extract user details
    setUser({
      id: decodedToken.id,
      email: decodedToken.email,
      role: decodedToken.role,
    });
    setToken(token);
    localStorage.setItem("token", token); // Save token in localStorage
    navigate("/dashboard");
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Automatically load user if token is present in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser({
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
        });
        setToken(storedToken);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
