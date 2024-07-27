import React from 'react';
import parse from 'html-react-parser';

const ResumeTemplate = React.forwardRef(({ resumeData, localImage }, ref) => {
    const stripHtmlTags = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    };
    return (
        <div className="container mx-auto my-5 p-5 bg-white shadow-lg rounded-lg max-w-screen-xl flex" ref={ref}>
            {/* Left Column */}
            <div className="left-column flex-1 p-5 bg-gray-200 border-r-2 border-blue-500 sticky">
                {localImage ? (
                    <img
                        src={localImage}
                        alt="Profile"
                        className="w-24 h-24 object-cover rounded-full"
                    />
                ) : (
                    <span className="text-white text-xl font-bold">Photo</span>
                )}
                <div className="contact-info my-2 text-xl">
                    {resumeData.header?.contact?.email && (
                        <>
                            <span className="email">Email: </span>
                            <span className="email-val">{resumeData.header.contact.email}</span>
                        </>
                    )}
                    {resumeData.header?.contact?.phone && (
                        <>
                            <span className="separator mx-2">|</span>
                            <span className="phone">Phone: </span>
                            <span className="phone-val">{resumeData.header.contact.phone}</span>
                        </>
                    )}
                    {(!resumeData.header?.contact?.email && !resumeData.header?.contact?.phone) && (
                        <span className="contact-info-placeholder">No contact information available</span>
                    )}
                </div>
                {resumeData.header?.contact?.address && (
                    <div className="address my-2">
                        <span className="address-title">Address: </span>
                        <span className="address-val">{resumeData.header.contact.address}</span>
                    </div>
                )}
                <div className="skills mt-5">
                    <div className="section__title text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-1 mb-2">
                        Skills
                    </div>
                    {resumeData.skills?.length > 0 ? (
                        resumeData.skills.map((skill, index) => (
                            <div key={index} className="skills__item bg-blue-100 text-gray-900 rounded-md p-2 mb-1 text-base">
                                {skill}
                            </div>
                        ))
                    ) : (
                        <div className="skills-placeholder text-gray-600">No skills listed</div>
                    )}
                </div>
                <div className="certifications mt-5">
                    <div className="section__title text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-1 mb-2">
                        Achievements & Awards
                    </div>
                    {resumeData.achievements?.length > 0 ? (
                        resumeData.achievements.map((certification, index) => (
                            <div key={index} className="section__list-item bg-blue-100 text-gray-900 rounded-md p-2 mb-1 text-base">
                                {certification}
                            </div>
                        ))
                    ) : (
                        <div className="certifications-placeholder text-gray-600">No certifications listed</div>
                    )}
                </div>
                <div className="certifications-section mt-5">
                    <div className="certification-title text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-1 mb-2">
                        Certifications
                    </div>
                    {resumeData.certifications.length > 0 ? (
                        resumeData.certifications.map((cert, index) => (
                            <div key={index} className="certification-item mb-5">
                                <div className="certification-description text-base">
                                    {cert.title}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="certifications-placeholder text-gray-600">No certifications available</div>
                    )}
                </div>
                <div className="custom-data-section mt-5">
                    {resumeData.customData.length > 0 ? (
                        resumeData.customData.map((item, index) => (
                            <div key={index} className="custom-data-item mb-5">
                                <div className="section__title text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-1 mb-2">
                                    {item.title}
                                </div>
                                <div className="section__content text-base">
                                    {parse(item.description)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="custom-data-placeholder text-gray-600">No custom data available</div>
                    )}
                </div>
            </div>

            {/* Right Column */}
            <div className="right-column flex-2 p-5 overflow-y-auto">
                <div className="header text-center mb-5">
                    <div className="full-name text-3xl font-bold text-gray-800">
                        <span className="first-name">{resumeData.header?.name || 'Name'}</span>
                    </div>
                    <div className="about mt-2">
                        <span className="position font-light text-xl text-blue-500">
                            {resumeData.header?.title || 'Your Title'}
                        </span>
                        <div className="desc mt-2 break-words whitespace-pre-wrap">
                            {resumeData.summary || 'No summary available'}
                        </div>
                    </div>
                </div>
                <div className="details">
                    <div className="section mb-5">
                        <div className="section__title text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-1 mb-2">
                            Work Experience
                        </div>
                        {resumeData.experience?.length > 0 ? (
                            resumeData.experience.map((job, index) => (
                                <div key={index} className="section__list-item mb-4 flex">
                                    <div className="left flex-1">
                                        <div className="name font-bold text-gray-800">{job?.company || 'Company Name'}</div>
                                        <div className="duration text-gray-600">{job?.duration || 'Duration'}</div>
                                    </div>
                                    <div className="right flex-2">
                                        <div className="name font-bold text-gray-800">{job?.jobTitle || 'Job Title'}</div>
                                        <div className="text-gray-700">{parse(job.responsibilities) || 'Project Description'}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="experience-placeholder text-gray-600">No work experience listed</div>
                        )}
                    </div>
                    <div className="section mb-5">
                        <div className="section__title text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-1 mb-2">
                            Education
                        </div>
                        {resumeData.education?.length > 0 ? (
                            resumeData.education.map((edu, index) => (
                                <div key={index} className="section__list-item mb-4 flex">
                                    <div className="left flex-1">
                                        <div className="name font-bold text-gray-800">{edu?.institution || 'Institution'}</div>
                                        <div className="duration text-gray-600">{edu?.year || 'Duration'}</div>
                                    </div>
                                    <div className="right flex-2">
                                        <div className="name font-bold text-gray-800">{edu?.degree || 'Degree'}</div>
                                        {console.log(typeof edu.extraInfo)}
                                        <div className="text-gray-700">{parse(String(edu.extraInfo)) || 'Project Description'}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="education-placeholder text-gray-600">No education listed</div>
                        )}
                    </div>
                    <div className="section mb-5">
                        <div className="section__title text-xl font-bold text-blue-500 border-b-2 border-blue-500 pb-1 mb-2">
                            Projects
                        </div>
                        {resumeData.projects?.length > 0 ? (
                            resumeData.projects.map((project, index) => (
                                <div key={index} className="section__list-item mb-4">
                                    <div className="name font-bold text-gray-800">{project?.title || 'Project Title'}</div>
                                    {console.log(typeof project.description)}
                                    <div className="text-gray-700">{parse(project.description) || 'Project Description'}</div>
                                </div>
                            ))
                        ) : (
                            <div className="projects-placeholder text-gray-600">No projects listed</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ResumeTemplate;
