import React, { useState } from 'react'
import classes from "./dashboard.module.css";

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = {
    name: "Faiyaz",
    role: "Admin", // Role can be "Admin", "Pharmacist", or "User"
    photo: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png", // URL to user's photo
  };
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <div className={classes.dashboard}>
      {/* Dropdown menu */}
      <div className={classes.dropdown}>
        <button onClick={toggleDropdown} className={classes.dropdownButton}>
          &#9776; {/* 3 horizontal lines */}
        </button>
        {isDropdownOpen && (
          <div className={classes.dropdownMenu}>
            <ul className={classes.dropdownList}>
              <li className={classes.dropdownItem}>Order History</li>
              <li className={classes.dropdownItem}>Update Address</li>
              <li className={classes.dropdownItem}>Update Password</li>
              <li className={classes.dropdownItem}>Update Email</li>
              <li className={classes.dropdownItem}>Update Phone Number</li>
            </ul>
          </div>
        )}
      </div>
    {/* <div className={classes.dashboard}> */}
      <div className={classes.userInfo}>
        {/* User Photo */}
        <img
          src={user.photo}
          alt={`${user.name}'s profile`}
          className={classes.userPhoto}
        />
        <div className={classes.userDetails}>
          {/* Username */}
          <h2 className={classes.userName}>{user.name}</h2>
          {/* User Role */}
          <p className={classes.userRole}>
            {user.role === "Admin" && "👑 Admin"}
            {user.role === "Pharmacist" && "💊 Pharmacist"}
            {user.role === "Doctor" && "🙋 Doctor"}
          </p>
        </div>
      </div>
      {/* Additional dashboard content */}
      <div className={classes.dashboardContent}>
        <h3>Welcome to your dashboard!</h3>
        {/* Add more content here */}
      </div>
    </div>
  // );
// };
    // <div>Dashboard</div>
  )
}
