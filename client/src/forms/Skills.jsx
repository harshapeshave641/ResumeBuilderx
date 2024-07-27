import React, { useState } from 'react';

const SkillsForm = ({ skills, handleSkillsChange, handleAddSkill, handleDeleteSkill }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddButtonClick = () => {
    if (newSkill.trim()) {
      handleAddSkill(newSkill);
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="p-2 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-bold mb-4">Skills</h2>
        <div className="flex mb-4 ">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            placeholder="Enter a skill"
          />
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>
      </div>
      <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
      <div className="flex flex-wrap gap-2">
  {skills.map((skill, index) => (
    <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-blue-200 w-1/5 min-w-[150px]">
      <span className="text-lg font-semibold text-gray-700 bg-blue-200">{skill}</span>
      <button
        onClick={() => handleDeleteSkill(index)}
        className="text-red-500 hover:text-red-700 focus:outline-none"
        aria-label={`Delete skill ${skill}`}
      >
        &times;
      </button>
    </div>
  ))}
</div>


      </div>
    </div>
  );
};

export default SkillsForm;
