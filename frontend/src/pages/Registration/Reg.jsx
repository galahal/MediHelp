import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import logo from "../../assets/dddw.jpeg";
import MediHelpLogo from "../../assets/dddw.jpeg";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Register = () => {
  // Define state variables for form fields
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the form data object
    const formData = {
      name: name,
      address: address,
      email: email,
      contact: contact,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Registration successful! Redirecting to login page.');
        navigate('/login'); // Redirect to the login page
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error during registration: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-l from-cyan-500 to-white p-4 flex justify-between items-center w-full shadow-md">
        <div className="flex items-center space-x-2">
          <img
            src={MediHelpLogo}
            alt="MediHelp Logo"
            className="h-10"
          />
          <span className="text-2xl font-bold text-blue-800">MediHelp</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/">
            <Button color="light-blue" size="sm" ripple={true}>
              Home
            </Button>
          </Link>
          <Link to="/login">
            <Button color="light-blue" size="sm" ripple={true}>
              Login
            </Button>
          </Link>
        </div>
      </nav>
      
      {/* Register Section */}
      <div className="flex items-center justify-center py-12 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 flex overflow-hidden">
          {/* Left Section: Form */}
          <div className="w-2/3 p-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              Register Yourself as User
            </h1>
            <p className="text-gray-600 mb-6">Begin your journey with us today</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Input Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              />
              <input
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
              />

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-700">
                  I accept the{" "}
                  <span className="text-blue-500 underline cursor-pointer">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition"
              >
                Register
              </button>
            </form>
          </div>

          {/* Right Section: Logo and Design */}
          <div className="w-1/3 bg-gradient-to-r from-teal-300 to-blue-400 flex flex-col items-center justify-center p-6">
            <img
              src={logo}
              alt="MediHelp Logo"
              className="w-36 h-36 object-contain mb-4"
            />
            <h2 className="text-2xl font-bold text-blue-900">MediHelp</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
