import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage'; // Import the HomePage component
import Dashboard from './pages/Dashboard/Dashboard';
export default function AppRoutes() {
  return (
    <Routes> 
      <Route path="/" element={<HomePage />} /> {/* Render HomePage here */}
      <Route
    path="/dashboard"
    element={<AuthRoute> <Dashboard /></AuthRoute>}/>
    </Routes>
    
  );
}
