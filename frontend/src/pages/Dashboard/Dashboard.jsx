import React from 'react'
import classes from "./dashboard.module.css";

export default function Dashboard() {
  const user = {
    name: "Faiyaz",
    role: "Admin", // Role can be "Admin", "Pharmacist", or "User"
    photo: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png", // URL to user's photo
  };
  return (
    <div className={classes.dashboard}>
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
