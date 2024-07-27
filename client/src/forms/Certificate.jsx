import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const Certificate = ({ resumeData, handleCertificationChange, handleAddCertification, handleDeleteCertification }) => (
  <div className="space-y-4">
    {resumeData.certifications.map((certification, index) => (
      <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-blue-600 mb-3">{certification.title || `Certification ${index + 1}`}</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Title</label>
          <input
            type="text"
            value={certification.title}
            onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        
        <button
          type="button"
          onClick={() => handleDeleteCertification(index)}
          className="bg-red-300 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
        >
          Delete Certification
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={handleAddCertification}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
    >
      Add Certification
    </button>
  </div>
);

export default Certificate;
