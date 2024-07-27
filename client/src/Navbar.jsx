// src/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt'); // Check if token exists

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    // Remove the token from localStorage
    localStorage.removeItem('jwt');
    // Redirect to home or login page
    navigate('/login');
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/10649/10649823.png"
            alt="Resume Building"
            className="w-10 h-10 rounded-full border-4 border-indigo-600 shadow-lg object-cover"
          /> */}
          <h1 className="text-3xl font-extrabold">Resume Builderx</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex items-center space-x-4">
            <li>
              <a
                href="/home"
                className="py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Contact
              </a>
            </li>
            {!token?(
                <>
                </>
            ):(
                <>
                    <li>
              <a
                href="/dashboard"
                className="py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Dashboard
              </a>
            </li>
                </>
            )}
          </ul>
          <div className="flex items-center space-x-2">
            {!token ? (
              <>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
