import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

const Resume2 = React.forwardRef(({ resumeData, localImage }, ref) => {
    // Check if resumeData is available
    if (!resumeData) {
        return <div>Loading...</div>; // Or any other placeholder
    }

    const renderSection = (title, content) => (
        <section className="my-4">
            <h3 className="text-xl font-semibold mb-2 border-b pb-1">{title}</h3>
            {content}
        </section>
    );

    const renderItemsInGrid = (items) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
                    {item}
                </div>
            ))}
        </div>
    );

    const renderExperience = () => (
        renderItemsInGrid(
            resumeData.experience.map((exp, index) => (
                <div key={index}>
                    <h4 className="text-lg font-semibold">{exp.company}</h4>
                    <p className="text-sm text-gray-600">{exp.jobTitle} | {exp.duration}</p>
                    <div className="text-sm mt-2">{parse(exp.responsibilities) || 'No description available'}</div>
                </div>
            ))
        )
    );

    const renderEducation = () => (
        renderItemsInGrid(
            resumeData.education.map((edu, index) => (
                <div key={index}>
                    <h4 className="text-lg font-semibold">{edu.institution}</h4>
                    <p className="text-sm text-gray-600">{edu.degree} | {edu.year}</p>
                    <p className="text-sm mt-2">{parse(String(edu.extraInfo)) || 'No additional info available'}</p>
                </div>
            ))
        )
    );

    const renderList = (items, defaultMessage) => (
        items.length > 0 ? (
            items.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
            ))
        ) : (
            <li className="text-sm">{defaultMessage}</li>
        )
    );

    const renderSkills = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                    <span className="text-blue-500">&#8226;</span>
                    <span>{skill}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen p-6" ref={ref}>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            {localImage ? (
                                <img src={localImage} alt="Profile" className="w-24 h-24 rounded-full mr-4" />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                                    <span className="text-gray-500">No Photo</span>
                                </div>
                            )}
                            <div>
                                <h2 className="text-2xl font-bold">{resumeData.header.name}</h2>
                                <p className="text-lg text-gray-600">{resumeData.header.title}</p>
                            </div>
                        </div>
                        {resumeData.header.contact && (
                            <div className="text-sm text-gray-600">
                                <p>{resumeData.header.contact.phone}</p>
                                <p>{resumeData.header.contact.email}</p>
                                <p>{resumeData.header.contact.address}</p>
                            </div>
                        )}
                    </div>
                    {renderSection('Summary', <p className="text-sm">{resumeData.summary || 'No summary available'}</p>)}
                    {resumeData.experience && renderSection('Experience', renderExperience())}
                    {resumeData.education && renderSection('Education', renderEducation())}
                    {resumeData.skills && renderSection('Skills', renderSkills())}
                    {resumeData.certifications && renderSection('Certifications', renderItemsInGrid(
                        resumeData.certifications.map((cert, index) => (
                            <div key={index}>
                                <div className="text-sm">{cert.title}</div>
                            </div>
                        ))
                    ))}
                    {resumeData.achievements && renderSection('Achievements', <ul className="list-disc list-inside text-sm">{renderList(resumeData.achievements, 'No achievements listed')}</ul>)}
                    {resumeData.projects && renderSection('Projects', renderItemsInGrid(
                        resumeData.projects.map((project, index) => (
                            <div key={index}>
                                <h4 className="text-lg font-semibold">{project.title}</h4>
                                <p className="text-sm mt-2">{parse(project.description) || 'No description available'}</p>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
});

Resume2.propTypes = {
    resumeData: PropTypes.shape({
        photo: PropTypes.string,
        header: PropTypes.shape({
            name: PropTypes.string.isRequired,
            title: PropTypes.string,
            contact: PropTypes.shape({
                phone: PropTypes.string,
                email: PropTypes.string,
                address: PropTypes.string
            }).isRequired
        }).isRequired,
        summary: PropTypes.string,
        experience: PropTypes.arrayOf(PropTypes.shape({
            company: PropTypes.string.isRequired,
            jobTitle: PropTypes.string,
            duration: PropTypes.string,
            responsibilities: PropTypes.string
        })),
        education: PropTypes.arrayOf(PropTypes.shape({
            institution: PropTypes.string.isRequired,
            degree: PropTypes.string,
            year: PropTypes.string,
            extraInfo: PropTypes.string
        })),
        skills: PropTypes.arrayOf(PropTypes.string),
        certifications: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string
        })),
        achievements: PropTypes.arrayOf(PropTypes.string),
        projects: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string
        }))
    }),
    localImage: PropTypes.string
};

export default Resume2;
