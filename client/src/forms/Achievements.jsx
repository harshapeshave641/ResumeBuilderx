import React from "react";

const AchievementsForm = ({ handleAchievementChange, handleAddAchievement, resumeData,handleAchievementDelete }) => {
  return (
    <div className="space-y-4">
      {resumeData.achievements.map((achievement, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-blue-600">{index + 1}</h3>
            <button
              onClick={() => handleAchievementDelete(index)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
          <div className="mb-3">
            
            <input
              type="text"
              value={achievement}
              onChange={(e) => handleAchievementChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddAchievement}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600"
      >
        Add Achievement
      </button>
    </div>
  );
};

export default AchievementsForm;
