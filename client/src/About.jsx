import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4" 
         style={{ backgroundImage: "url('https://th.bing.com/th/id/R.4ed8ba5342797b3b755aa2805661ad84?rik=DvKfVEqj8NXw1A&riu=http%3a%2f%2fwallpapercave.com%2fwp%2f9PaZMV2.jpg&ehk=fRj%2btoee9MqXG0Q9rW%2bU4E82B01PZmYa03DRxWxnJF8%3d&risl=&pid=ImgRaw&r=0')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <header className="text-center mb-8 bg-white  p-4 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">About Resume Builderx</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Build the perfect Resume with Resume Builderx.
        </p>
      </header>
      
      <section className="w-full max-w-4xl mb-8">
        <div className="bg-white  shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Meet the Developer</h2>
          <img
            src="https://i.fbcd.co/products/original/fbc0d40bcc8abfed886e910a82a55fa482c2aede7861bc36044b729eceeecb54.jpg"
            alt="Harsha Peshave"
            className="w-32 h-32 rounded-full border-4 border-indigo-600 mb-6 shadow-lg object-cover mx-auto"
          />
          <p className="text-gray-700">
            Hello! I'm Harsha Peshave, a passionate developer dedicated to helping job seekers create professional resumes effortlessly. With a background in computer science and a keen interest in full-stack web development, I've built Resume Warrior to be a user-friendly and powerful tool for anyone looking to advance their career.
          </p>
        </div>

        <div className="bg-white  shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">More....</h2>
          <img
            src="https://animationexplainers.com/wp-content/uploads/2021/10/animated-resume.jpg"
            alt="Mission"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700">
            At Resume Builderx, the mission is to simplify the resume-building process while providing all the tools you need to create a standout resume. This application provides the opportunity to present their one's and achievements in the best possible way.
          </p>
        </div>

        {/* <div className="bg-white bg-opacity-90 shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Choose Resume Warrior?</h2>
          <img
            src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6"
            alt="Why Choose Us"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700">
            Our platform is designed with you in mind. Whether you're a recent graduate or a seasoned professional, Resume Warrior provides an intuitive and efficient way to build a resume that stands out. Our professional templates, customizable sections, and real-time preview ensure that your resume looks polished and professional.
          </p>
        </div> */}
      </section>
      
      <footer className="text-center mt-8 bg-white bg-opacity-70 p-4 rounded-lg shadow-lg">
        <p className="text-gray-600">&copy; 2024 Resume Warrior. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
