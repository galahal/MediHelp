// import { Link } from 'react-router-dom';
// import classes from './header.module.css';

// const Header = () => {
//   console.log('Header component rendered'); // Add this to debug
//   const user = { name: "Faiyaz" };
//   const cart = { totalCount: 10 };

//   const logout = () => {
//     console.log("Logout clicked!");
//   };
//   const dashboard = () =>{
//     return(
//       <div>
//         <h1>Dashboard</h1>
//         <p>Welcome to your dashboard</p>
//       </div>
//     )
//   }

//   return (
//     <header className={classes.header}>
//       <div className={classes.container}>
//         {/* <Link to="/" className={classes.logo}> */}
//           Medihelp
//         {/* </Link> */}
//         <nav>
//           <ul>
//             {user ? (
//               <li className={classes.menu_container}>
//                 {/* <Link to="/profile">{user.name}</Link> */}
//                 {user.name}
//                 <div className={classes.menu}>
//                   {/* <Link to="/profile">Profile</Link>
//                   <Link to="/orders">Orders</Link> */}
//                   <a onClick={logout}>Logout</a>
//                   <Link to="/dashboard">Profile</Link>
//                   <Link to="/register">Reg</Link>
//                   <Link to="/login">Login</Link>
//                   <Link to="/manage-pharmacy">MNG Pharmacy</Link>
//                   <Link to="/reqmed">Req-Med</Link>
//                   <Link to="/manage-medicine">MNG Med</Link>
//                 </div>
//               </li>
//             ) : (
//               <li>
//                 {/* <Link to="/login">Login</Link> */}
//               </li>
//             )}
//             <li>
//               {/* <Link to="/cart"> */}
//                 Cart
//                 {cart.totalCount > 0 && <span>({cart.totalCount})</span>}
//               {/* </Link> */}
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MediHelpLogo from "../../assets/dddw.jpeg";

const Navbar = ({ user }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav
      className={`sticky top-0 z-50 px-4 py-2 shadow transition-all ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800 via-blue-900 to-black"
          : "bg-gradient-to-r from-white via-blue-200 to-pink-200"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-2">
          <img src={MediHelpLogo} alt="Logo" className="h-6 w-6" />
          <h1
            className={`text-sm font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            MediHelp
          </h1>
        </div>

        {/* Right Section - Buttons and User */}
        <div className="flex items-center gap-4">
          {/* Navigation Links */}
          <Link
            to="/"
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/manage-medicine"
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            Manage Medicine
          </Link>
          <Link
            to="/manage-pharmacy"
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            Manage Pharmacy
          </Link>
          <Link
            to="/reqmed"
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            Request Medicine
          </Link>

          {/* User Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-gray-800 p-1 text-sm text-gray-300 hover:text-white dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
            >
              <img
                src="https://ptpimg.me/xun121.png"
                alt="User Avatar"
                className="h-6 w-6 rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 z-10 hidden w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none group-hover:block dark:bg-gray-800">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Your Profile
              </Link>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
              <button
                onClick={toggleTheme}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Toggle Theme
              </button>
              <button
                onClick={() => alert("Logged out")}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
