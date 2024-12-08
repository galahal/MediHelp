import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage'; // Import the HomePage component
import Dashboard from './pages/Dashboard/Dashboard'; // dashboard component
import Register from './pages/Registration/Reg';
import Login from './pages/Login/LoginPage';

export default function AppRoutes() {
  return (
    <Routes> 
      <Route path="/" element={<HomePage />} /> {/* Render HomePage here */}
      {/* <Route
    path="/dashboard"
    element={<AuthRoute> <Dashboard /></AuthRoute>}/> */}
    <Route path="/dashboard" element={<Dashboard />} /> {/* Render Dashboard here */} 
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    </Routes>
    
  );
}
