import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage'; // Import the HomePage component
import Dashboard from './pages/Dashboard/Dashboard'; // dashboard component
import Register from './pages/Registration/Reg';
import Login from './pages/Login/LoginPage';
import ManagePharmacy from './pages/ManagePharmacy/ManagePharmacy';
import RequestMedicine from './pages/RequestMedicine/RequestMedicine';
import ManageMedicine from './pages/ManageMedicine/ManageMedicine';

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
    <Route path="/manage-pharmacy" element={<ManagePharmacy />} />
    <Route path="/reqmed" element={<RequestMedicine />} />
    <Route path="/manage-medicine" element={<ManageMedicine/>} />
    </Routes>
    
  );
}
