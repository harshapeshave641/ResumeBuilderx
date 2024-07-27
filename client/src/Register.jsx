import React, { useState } from 'react';
import LeftComponent from './LeftComponent';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const FormComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [flashMessage, setFlashMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation checks
    const { username, email, password, confirm } = formData;

    if (!username || !email || !password || !confirm) {
      setFlashMessage('All fields are required.');
      return;
    }

    if (password !== confirm) {
      setFlashMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setFlashMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      setFlashMessage('');
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('jwt', token);
          console.log('Form submitted:', response.data);
        setFlashMessage('Login successful!');
          navigate('/dashboard'); 
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFlashMessage('Error submitting form. Please try again.');
    }
   
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex flex-grow">
        <div className="w-1/2 bg-white-200 flex items-center justify-center p-4">
          <LeftComponent />
        </div>
        <div className="w-3/4 bg-indigo-100 flex items-center justify-center p-4">
          <div className="bg-indigo-100 flex justify-center items-center h-screen mb-5">
            <div className="w-full max-w-4xl">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg mt-0 mb-20"
              >
                <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
                  Register
                </h1>
                {flashMessage && (
                  <div className="mb-4 text-red-600 font-semibold">
                    {flashMessage}
                  </div>
                )}
                <div className="mb-4">
                  <label
                    className="text-gray-800 font-semibold block mb-2 text-md"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="text-gray-800 font-semibold block mb-2 text-md"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="text-gray-800 font-semibold block mb-2 text-md"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="text-gray-800 font-semibold block mb-2 text-md"
                    htmlFor="confirm"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm password"
                    value={formData.confirm}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
                >
                  Register
                </button>
                <button
                  type="button"
                  className="w-full mt-4 mb-2 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
                  onClick={handleLoginClick}
                >
                  Already have an Account?
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
