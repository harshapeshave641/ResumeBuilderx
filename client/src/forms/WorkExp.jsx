import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const Experience = ({ resumeData, handleExperienceChange, handleAddExperience, handleDeleteExperience }) => (
  <div className="space-y-4">
    {resumeData.experience.map((exp, index) => (
      <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-blue-600 mb-3">{exp.jobTitle}  {exp.company}</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Job Title</label>
          <input
            type="text"
            value={exp.jobTitle}
            onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Company</label>
          <input
            type="text"
            value={exp.company}
            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Duration</label>
          <input
            type="text"
            value={exp.duration}
            onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Responsibilities</label>
          <ReactQuill
            value={exp.responsibilities}
            onChange={(value) => handleExperienceChange(index, 'responsibilities', value)}
            className="w-full border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <button
          type="button"
          onClick={() => handleDeleteExperience(index)}
          className="bg-red-300 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
        >
          Delete Experience
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={handleAddExperience}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
    >
      Add Experience
    </button>
  </div>
);

export default Experience;
