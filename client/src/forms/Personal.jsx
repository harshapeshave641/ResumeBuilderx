import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useEffect } from 'react';
import ImageContext from '../contexts/ImageContext';
const PersonalInformationForm = ({ resumeData, handleChange, handleSummaryChange ,handleFileChange,localImage}) => {
    

    return (
        <div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="col-span-1">
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="header.name"
                        value={resumeData.header?.name || ''}
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded text-gray-700"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        name="header.title"
                        value={resumeData.header?.title || ''}
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded text-gray-700"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-semibold mb-1">Phone</label>
                    <input
                        type="text"
                        name="header.contact.phone"
                        value={resumeData.header?.contact?.phone || ''}
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded text-gray-700"
                    />
                </div>
                <div className="col-span-1">
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="text"
                        name="header.contact.email"
                        value={resumeData.header?.contact?.email || ''}
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded text-gray-700"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Address</label>
                    <input
                        type="text"
                        name="header.contact.address"
                        value={resumeData.header?.contact?.address || ''}
                        onChange={handleChange}
                        className="w-full p-1 border border-gray-300 rounded text-gray-700"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Summary</label>
                    <input
                        type="text"
                        name="summary"
                        value={resumeData.summary || ''}
                        onChange={handleSummaryChange}
                        className="w-full p-1 border border-gray-300 rounded text-gray-700"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-semibold mb-1">Upload Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-1 border border-gray-300 rounded text-gray-700"
                    />
                   
                </div>

                {/* Display Image */}
                {(localImage) && (
                    <div className="col-span-2 mt-2">
                        <img
                            src={localImage}
                            alt="Preview"
                            style={{ width: '200px', height: 'auto' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonalInformationForm;
