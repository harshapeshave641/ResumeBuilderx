import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const Custom = ({ resumeData, handleCustomChange, handleAddCustom, handleDeleteCustom }) => (
  <div className="space-y-4">
    {resumeData.customData.map((custom, index) => (
      <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-blue-600 mb-3">{custom.title || `Custom Data ${index + 1}`}</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Title</label>
          <input
            type="text"
            value={custom.title}
            onChange={(e) => handleCustomChange(index, 'title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Description</label>
          <ReactQuill
            value={custom.description}
            onChange={(value) => handleCustomChange(index, 'description', value)}
            className="w-full border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <button
          type="button"
          onClick={() => handleDeleteCustom(index)}
          className="bg-red-300 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
        >
          Delete Custom Data
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={handleAddCustom}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
    >
      Add Custom Data
    </button>
  </div>
);

export default Custom;
