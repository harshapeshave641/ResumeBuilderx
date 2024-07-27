import React from 'react';
import FormComponent from './Register';
import LeftComponent from './LeftComponent';
import Navbar from './Navbar';
import LoginForm from './LoginForm';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contacts';
import Dashboard from './Dashboard'
import ResumeBuilder from './Resume';
function App() {
  return (
    // <div className="flex flex-col h-screen">
    //   <Navbar />
    //   <div className="flex flex-grow">
    //     <div className="w-1/2 bg-white-200 flex items-center justify-center p-4">
    //       <LeftComponent />
    //     </div>
    //     <div className="w-3/4 bg-indigo-100 flex items-center justify-center p-4">
    //       <LoginForm />
    //     </div>
    //   </div>
    // </div>
    <>
    <Router>
      <div>
        <Navbar />
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<FormComponent />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-project" element={<ResumeBuilder />} />
        <Route path="/create-project/:id" element={<ResumeBuilder />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
