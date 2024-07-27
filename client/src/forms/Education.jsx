import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const Education = ({ resumeData, handleEducationChange, handleAddEducation,handleDeleteEducation }) => {
  return (
    <div className="space-y-4">
      {resumeData.education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">{edu.degree}</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-blue-600">Degree</label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-blue-600">Institution</label>
            <input
              type="text"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-blue-600">Year Range</label>
            <input
              type="text"
              value={edu.year}
              onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Extra Info</label>
            <ReactQuill
              value={edu.extraInfo}
              onChange={(value) => handleEducationChange(index, 'extraInfo', value)}
              className="w-full border border-gray-300 rounded-md text-gray-600"
            />
          </div>
          <button
        type="button"
        onClick={() => handleDeleteEducation(index)}
        className="bg-red-300 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
      >
        Delete Education
      </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddEducation}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
      >
        Add Education
      </button>
      
    </div>
  );
};

export default Education;
