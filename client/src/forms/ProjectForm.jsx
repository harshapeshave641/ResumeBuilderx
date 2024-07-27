import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS

const ProjectForm = ({ resumeData, handleProjectChange, handleAddProject, handleDeleteProject }) => (
  <div className="space-y-4">
    {resumeData.projects.map((project, index) => (
      <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-blue-600 mb-3">{project.title}</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Title</label>
          <input
            type="text"
            value={project.title}
            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1 text-blue-600">Description</label>
          <ReactQuill
            value={project.description}
            onChange={(value) => handleProjectChange(index, 'description', value)}
            className="w-full border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <button
          type="button"
          onClick={() => handleDeleteProject(index)}
          className="bg-red-300 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600"
        >
          Delete Project
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={handleAddProject}
      className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
    >
      Add Project
    </button>
  </div>
);

export default ProjectForm;
