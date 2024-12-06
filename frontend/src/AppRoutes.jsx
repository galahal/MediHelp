import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage'; // Import the HomePage component

export default function AppRoutes() {
  return (
    <Routes> 
      <Route path="/" element={<HomePage />} /> {/* Render HomePage here */}
    </Routes>
  );
}
