import React, { useState } from "react";
import logo from "../../assets/dddw.jpeg";
import { useNavigate } from "react-router-dom";
import MediHelpLogo from "../../assets/dddw.jpeg";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);
        setSuccess('Login successful! Redirecting...');
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-l from-cyan-500 to-white p-4 flex justify-between items-center w-full shadow-md"  style={{ position: 'relative', top: '-140px' }}  >
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
          <Link to="/register">
            <Button color="light-blue" size="sm" ripple={true}>
              Register
            </Button>
          </Link>
        </div>
      </nav>

      {/* Login Section */}
      <div className="bg-white rounded-lg shadow-md w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 flex overflow-hidden mt-8">
        {/* Left Section: Form */}
        <div className="w-2/3 p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Login</h1>
          <p className="text-gray-600 mb-6">Welcome back! Please login to your account</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              Forgot your password?{' '}
              <span className="text-blue-500 underline cursor-pointer">Click here</span>
            </p>
          </div>
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
  );
};

export default Login;