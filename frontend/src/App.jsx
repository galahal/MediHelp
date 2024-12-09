// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Header from "./components/Header/Header";
// // import AppRoutes from './AppRoutes.jsx';
// // import Register from './pages/Registration/Reg';
// // import Home from './components/Home'; // Example component for Home page
// // import Profile from './components/Profile'; // Example component for Profile page
// // import Login from './components/Login'; // Example component for Login page
// // import Cart from './components/Cart'; // Example component for Cart page

// import React from "react";
// import { BrowserRouter,Route,Routes, useLocation } from "react-router-dom";
// import Header from "./components/Header/Header";
// import Header2 from "./components/Header/Header2";
// import Register from './pages/Registration/Reg'; // Correct import for Register
// import AppRoutes from "./AppRoutes";

// // const location=useLocation();
// // const isReg = location.pathname === "/register";

// function App() {


//   return (
//     <BrowserRouter>
//       {/* {isReg ? <Header2 />: <Header /> } */}
//       <Header />
//       <AppRoutes /> {/* Directly rendering the Register component */}
//     </BrowserRouter>



//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Register from './pages/Registration/Reg'; // Correct import for Register
import AppRoutes from "./AppRoutes";

const App = () => {
  const location = useLocation(); // Get the current path
  const isHome = location.pathname === "/"; // Check if it's the Home route
  const isLogin = location.pathname === "/login"; // Check if it's the Home route
  const isRegister = location.pathname === "/register"; // Check if it's the Home route

  return (
    <>
      {/* Render Header only if not on Home route */}
      {!isHome && !isLogin && !isRegister && <Header />}
      <AppRoutes />
    </>
  );
};

// Wrap the App with a custom Router wrapper
const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWithRouter;
