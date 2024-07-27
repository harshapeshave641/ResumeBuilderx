import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 ">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full mb-30">
        <h1 className="text-2xl font-bold text-blue-800 mb-4 text-center">Contact Details</h1>
        <p className="text-gray-700 mb-4">
          If you have any questions or need further information, feel free to reach out to me.
        </p>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-800 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10h18M3 6h18M3 14h18m-9 4h9M4 18h1M3 22h18M21 18h1M21 22h1" />
            </svg>
            <span className="text-gray-700">Email: harshapeshave13@gmail.com</span>
          </div>
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-800 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4m-6 6h12m-6 6v4m6-14l-4-4m0 0l-4 4m4-4v12" />
            </svg>
            <span className="text-gray-700">Alternate email:peshaveharsha12@gmail.com</span>
          </div>
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-800 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12l-7 7-7-7M12 5v14" />
            </svg>
            <span className="text-gray-700">LinkedIn: linkedin.com/in/harshapeshave</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
