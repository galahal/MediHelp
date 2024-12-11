import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MediHelpLogo from "../../assets/dddw.jpeg";
import { ThemeContext } from '../../ThemeContext.jsx'; // Import the ThemeContext

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

// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import MediHelpLogo from '../../assets/dddw.jpeg';
// import { ThemeContext } from '../../ThemeContext.jsx';

// const Navbar = ({ user }) => {
//   const { theme, toggleTheme } = useContext(ThemeContext);

//   return (
//     <nav className={`sticky top-0 z-50 bg-gradient-to-r ${theme === 'dark' ? 'from-blue-900 via-gray-800 to-blue-800' : 'from-white via-blue-100 to-pink-100'} shadow-md`}>
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2">
//           <img src={MediHelpLogo} alt="Logo" className="h-8 w-8 rounded" />
//           <h1 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>MediHelp</h1>
//         </div>

//         {/* Buttons and User Section */}
//         <div className="flex items-center gap-4">
//           {/* Navigation Links */}
//           <div className="flex gap-4">
//             <Link
//               to="/"
//               className={`px-3 py-1 rounded text-sm font-medium ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//             >
//               Home
//             </Link>
//             <Link
//               to="/dashboard"
//               className={`px-3 py-1 rounded text-sm font-medium ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/manage-medicine"
//               className={`px-3 py-1 rounded text-sm font-medium ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//             >
//               Manage Medicine
//             </Link>
//             <Link
//               to="/manage-pharmacy"
//               className={`px-3 py-1 rounded text-sm font-medium ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//             >
//               Manage Pharmacy
//             </Link>
//             <Link
//               to="/reqmed"
//               className={`px-3 py-1 rounded text-sm font-medium ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//             >
//               Request Medicine
//             </Link>
//           </div>

//           {/* User Profile Section */}
//           <div className="relative">
//             <button
//               type="button"
//               className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               <img
//                 src="https://ptpimg.me/xun121.png"
//                 alt="User"
//                 className="h-8 w-8 rounded-full"
//               />
//             </button>
//             {/* Dropdown Menu */}
//             <div className="absolute right-0 mt-2 hidden w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg group-hover:block">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Your Profile
//               </Link>
//               <Link
//                 to="/settings"
//                 className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Settings
//               </Link>
//               <button
//                 onClick={toggleTheme}
//                 className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Toggle Theme
//               </button>
//               <button
//                 className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
