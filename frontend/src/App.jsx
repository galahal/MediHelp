// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Header from "./components/Header/Header";
// import AppRoutes from './AppRoutes.jsx';
// import Register from './pages/Registration/Reg';
// import Home from './components/Home'; // Example component for Home page
// import Profile from './components/Profile'; // Example component for Profile page
// import Login from './components/Login'; // Example component for Login page
// import Cart from './components/Cart'; // Example component for Cart page

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Register from './pages/Registration/Reg'; // Correct import for Register

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Register /> {/* Directly rendering the Register component */}
    </BrowserRouter>
  );
};

export default App;