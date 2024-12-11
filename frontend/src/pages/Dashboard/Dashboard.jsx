import React, { useState, useEffect, useRef } from "react";
import classes from "./dashboard.module.css";

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // 'home' or 'updateInfo'
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [addressInput, setAddressInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const dropdownRef = useRef(null);

  // Fetch user from localStorage
  const fetchUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUserByEmail(parsedUser.email);
    } else {
      console.error("User not found in localStorage");
    }
  };

  // Fetch user data by email
  const fetchUserByEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/email/${email}`);
      const data = await response.json();
      if (data.status === "SUCCESS") {
        setUser(data.user);
        setAddressInput(data.user.address || "");
        setEmailInput(data.user.email || "");
        setContactInput(data.user.contact || "");
      } else {
        console.error("Failed to fetch user by email");
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  };

  // Update user information
  const updateUser = async (field, value) => {
    try {
      const urlMapping = {
        email: `update-email/${user.id}`,
        password: `update-password/${user.id}`,
        address: `update-address/${user.id}`,
        contact: `update-contact/${user.id}`,
      };

      const endpoint = urlMapping[field];
      if (!endpoint) {
        console.error("Invalid field for update");
        return;
      }

      const bodyData =
        field === "password"
          ? value // Password update requires both oldPassword and newPassword
          : { [`new${field.charAt(0).toUpperCase() + field.slice(1)}`]: value };

      const response = await fetch(`http://localhost:5000/api/user/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (data.status === "SUCCESS") {
        setUser({ ...user, [field]: value });
        setSuccessMessage(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setErrorMessage(data.message || "Failed to update");
        setTimeout(() => setErrorMessage(null), 5000);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  // Password-specific update handler
  const handlePasswordUpdate = () => {
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("password").value;
    updateUser("password", { oldPassword, newPassword });
  };

  useEffect(() => {
    fetchUserFromLocalStorage();

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className={classes.dashboard}>
      {/* Dropdown menu */}
      <div
        className={classes.dropdown}
        ref={dropdownRef}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button className={classes.dropdownButton}>&#9776;</button>
        {isDropdownOpen && (
          <div className={classes.dropdownMenu}>
            <ul className={classes.dropdownList}>
              <li className={classes.dropdownItem}>Order History</li>
              <li
                className={classes.dropdownItem}
                onClick={() => setActiveTab("updateInfo")}
              >
                Update Information
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Tabs */}
      {activeTab === "home" && (
        <>
          <div className={classes.userInfo}>
            <img
              src={user.photo || "https://ptpimg.me/xun121.png"}
              alt={`${user.name}'s profile`}
              className={classes.userPhoto}
            />
            <div className={classes.userDetails}>
              <h2 className={classes.userName}>{user.name}</h2>
              <p className={classes.userRole}>
                {user.isAdmin && "👑 Admin"}
                {user.isPharmacist && "💊 Pharmacist"}
                {user.isDoctor && "🙋 Doctor"}
              </p>
            </div>
          </div>
          <div className={classes.dashboardContent}>
            <h3>Welcome to your dashboard!</h3>
            <p><strong>Address:</strong> {user.address || "Not Provided"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone Number:</strong> {user.contact || "Not Provided"}</p>
          </div>
        </>
      )}

      {activeTab === "updateInfo" && (
        <div className={classes.updateInfoTab}>
          <form className={classes.updateForm}>
            {/* Password Update */}
            <div className={classes.formGroup}>
              <label htmlFor="oldPassword">Old Password:</label>
              <input type="password" id="oldPassword" placeholder="Enter old password" />
              <label htmlFor="password">New Password:</label>
              <input type="password" id="password" placeholder="Enter new password" />
              <button type="button" onClick={handlePasswordUpdate}>
                Submit
              </button>
            </div>

            {/* Address Update */}
            <div className={classes.formGroup}>
              <label htmlFor="address">Update Address:</label>
              <input
                type="text"
                id="address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Enter new address"
              />
              <button type="button" onClick={() => updateUser("address", addressInput)}>
                Submit
              </button>
            </div>

            {/* Email Update */}
            <div className={classes.formGroup}>
              <label htmlFor="email">Update Email:</label>
              <input
                type="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter new email"
              />
              <button type="button" onClick={() => updateUser("email", emailInput)}>
                Submit
              </button>
            </div>

            {/* Phone Number Update */}
            <div className={classes.formGroup}>
              <label htmlFor="contact">Update Phone Number:</label>
              <input
                type="text"
                id="contact"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="Enter new phone number"
              />
              <button type="button" onClick={() => updateUser("contact", contactInput)}>
                Submit
              </button>
            </div>
          </form>
          <button className={classes.backButton} onClick={() => setActiveTab("home")}>
            Back to Dashboard
          </button>
          {successMessage && <div className={classes.successMessage}>{successMessage}</div>}
          {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
        </div>
      )}
    </div>
  );
}
