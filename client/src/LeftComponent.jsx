import React from 'react';
import { useNavigate } from 'react-router-dom';
const LeftComponent = () => {
    const navigate = useNavigate();

    const handleAboutClick = () => {
      navigate('/about');
    };
   
  return (
    <div className="w-2/3 flex flex-col items-center justify-center h-full p-8 bg-white border-black-200">
      {/* Image at the top */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/10649/10649823.png"
        alt="Resume Building"
        className="w-32 h-32 rounded-full border-4 border-indigo-600 mb-6 shadow-lg object-cover" // Adjust styles as needed
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Resume Builderx</h1>
      <p className="text-lg text-gray-600 mb-6 ">
        Create professional resumes quickly and easily. This intuitive platform lets you build a standout resume without the hassle.
      </p>
      <a
        href="#"
        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-indigo-700 mb-20"
      onClick={handleAboutClick}>
        Read More
      </a>
    </div>
  );
};

export default LeftComponent;
