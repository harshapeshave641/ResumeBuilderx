import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Navigate,useNavigate } from 'react-router-dom';
const Home = () => {
   

    const navigate = useNavigate();

    const handleRegisterClick = () => {
      navigate('/about');
    };
    const handleLoginClick = () => {
        navigate('/contact');
      };

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col items-center p-4">
         <div className="bg-white shadow-md rounded-lg p-6 mb-6"></div>
      {/* Blurred Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed filter " style={{ backgroundImage: "url('https://media.graphassets.com/resize=fit:crop,width:1200,height:630/PbRLpQITRrWua148pDns')" }}></div>
      
      {/* Content */}
      <div className="relative z-10">
        <header className="text-center mb-8 border border-black-500">
          <div className="flex flex-col items-center bg-white shadow-md rounded-lg  ">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10649/10649823.png"
              alt="Resume Building"
              className="w-32 h-32 rounded-full border-4 border-indigo-600 mb-6 shadow-lg object-cover"
            />
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Welcome to Resume Builderx</h1>
            <p className="text-lg text-gray-700 max-w-2xl">
              Build and manage your professional resume with ease. Our platform provides an intuitive and efficient way to create a standout resume that will help you land your dream job.
            </p>
          </div>
        </header>
        <section className="w-full max-w-4xl mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Key Features</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                <span>Easy-to-use resume builder with drag-and-drop functionality</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                <span>Professional templates tailored for various industries</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                <span>Customizable sections to highlight your skills and achievements</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                <span>Real-time preview to see your changes instantly</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-blue-600 mt-1 mr-2" />
                <span>Export to PDF for easy sharing and printing</span>
              </li>
            </ul>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Choose Us?</h2>
            <p className="text-gray-700 mb-4">
              At Resume Warrior, we understand the importance of a well-crafted resume. Our platform is designed to simplify the resume creation process while providing all the tools you need to impress potential employers. Whether you are a recent graduate or a seasoned professional, we have the right features to help you succeed.
            </p>
            <p className="text-gray-700 mb-4">
              Join thousands of satisfied users who have successfully built their resumes with Resume Warrior. Our user-friendly interface, combined with powerful customization options, makes us the best choice for job seekers.
            </p>
            <div className="flex space-x-4 justify-center">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"onClick={handleRegisterClick}>
                About
              </button>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"onClick={handleLoginClick}>
                Contact
              </button>
            </div>
          </div>
        </section>
        {/* <section className="w-full max-w-4xl mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Testimonials</h2>
            <p className="text-gray-700 mb-4">
              "Resume Warrior made creating my resume so easy! The templates are fantastic and the customization options allowed me to tailor my resume exactly how I wanted it." - Jane Doe
            </p>
            <p className="text-gray-700 mb-4">
              "I landed my dream job thanks to Resume Warrior. The real-time preview feature is a game-changer. Highly recommend this platform to anyone looking to build a professional resume." - John Smith
            </p>
          </div>
        </section> */}
        <footer className="text-center mt-8">
          <p className="text-gray-600">&copy; 2024 Resume Builderx. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
