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




import React from "react";
import { Link, useHref } from "react-router-dom";
import MediHelpLogo from "../../assets/dddw.jpeg";




const Navbar = ({ user }) => {
  return (
    <nav className="flex items-center justify-between bg-blue-100 px-4 py-2 shadow">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <img src={MediHelpLogo} alt="Logo" className="h-8 w-8" />
        <h1 className="text-sm font-semibold">MediHelp</h1>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          Dashboard
        </Link>
        <Link
          to="/manage-medicine"
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          Manage Medicine
        </Link>
        <Link
          to="/manage-pharmacy"
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          Manage Pharmacy
        </Link>
        <Link
          to="/reqmed"
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          Request Pharmacy
        </Link>
      </div>

      {/* Right Section - User */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-gray-300 rounded-full">
          <img src="https://ptpimg.me/xun121.png" alt="Logo" className="h-8 w-8" />
        </div>
        <span className="text-sm font-semibold">
          {user ? user : "user"}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;















