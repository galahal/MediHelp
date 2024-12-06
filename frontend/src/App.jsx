import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header/Header";
import AppRoutes from './AppRoutes.jsx';
// import Home from './components/Home'; // Example component for Home page
// import Profile from './components/Profile'; // Example component for Profile page
// import Login from './components/Login'; // Example component for Login page
// import Cart from './components/Cart'; // Example component for Cart page

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
