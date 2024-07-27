// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeProjectIndex, setActiveProjectIndex] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (project) => {
        try {
            const response = await axios.delete(`http://localhost:5000/delete-project/${project._id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                }
            });

            if (response.status === 200) {
                console.log('Resume deleted successfully');
                window.location.reload();
                navigate('/dashboard');
            } else {
                console.error('Failed to delete resume');
            }
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:5000/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                setError('Failed to fetch user data.');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) return <div className="text-center text-lg">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!userData || !userData.projects) return null;

    const imageLinks = [
        'https://gauravtiwari.org/wp-content/uploads/2021/01/resume-bio-data-job-1799955.jpg',
        'https://th.bing.com/th/id/OIP.tN1A8PrN0soU_FRO75wQWwHaEt?w=860&h=547&rs=1&pid=ImgDetMain',
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-8">
            <div className="bg-white w-full max-w-4xl mx-auto rounded-lg shadow-lg p-8 mb-8">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">Dashboard</h1>
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome, {userData.user.username}!</h2>
                </div>
            </div>

            <div className="flex flex-wrap justify-start gap-6">
                {userData.projects.map((project, index) => (
                    <div
                        key={index}
                        className="relative bg-white p-6 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition-shadow duration-300 ease-in-out w-80 h-80 flex flex-col justify-between"
                    >
                        <img 
                            src={project.imageURL || imageLinks[index % imageLinks.length]} 
                            alt={project.title} 
                            className="w-full h-60 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                            <button
                                onClick={() => setActiveProjectIndex(activeProjectIndex === index ? null : index)}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <HiDotsVertical size={24} />
                            </button>
                            {activeProjectIndex === index && (
                                <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-lg w-32">
                                    <ul className="py-1">
                                        <li>
                                            <button 
                                                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => navigate(`/create-project/${project._id}`)}
                                            >
                                                View
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => handleDelete(project)}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                onClick={() => navigate(`/create-project/${project._id}`)}
                                            >
                                                Download
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {project.header.title || 'Resume template'}
                            </h3>
                            <p className="text-gray-600">{project.description}</p>
                        </div>
                    </div>
                ))}
                <div
                    className="bg-gray-300 p-6 rounded-lg shadow-md border border-gray-500 flex flex-col items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-400 transition-colors duration-300 ease-in-out w-80 h-80"
                    onClick={() => navigate('/create-project')}
                >
                    <div className="text-4xl font-bold">+</div>
                    <p className="mt-2 text-lg">Create New</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
