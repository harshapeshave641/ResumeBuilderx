import React, { useState,useEffect } from 'react';
import {  FaTools ,FaUser, FaGraduationCap, FaCertificate, FaTrophy, FaCog, FaBriefcase } from 'react-icons/fa';
import { MdSportsMma } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import ResizableSidebar from './Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import PersonalInformationForm from './forms/Personal';
import Education from './forms/Education';
import AchievementsForm from './forms/Achievements';
import SkillsForm from './forms/Skills';
import ProjectForm from './forms/ProjectForm';
import Experience from './forms/WorkExp';
import Custom from './forms/CustomForm';
import Certificate from './forms/Certificate';
import ResumeTemplate from './templates/template1';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Resume2 from './templates/template2';
const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState({
    header: {
      name: '',
      title: '',
      contact: {
        phone: '',
        email: '',
        address: '',
      }
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications:[],
    achievements:[],
    projects:[],
    customData:[],
    photo:''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          navigate('/login'); 
          return;
        }

        if (id) { // If an ID is present, fetch the existing resume data
          const response = await axios.get(`http://localhost:5000/create-project/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setResumeData(response.data);
        }
        
      } catch (error) {
        console.log('Failed to fetch resume data.', error);
        navigate('/login');
      }
    };
    fetchData();
  }, [id, navigate]);


  const [localImage, setLocalImage] = useState(''); 
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocalImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    
    const handleSave = async () => {
      try {
        const token = localStorage.getItem('jwt');
          const response = await axios.post("http://localhost:5000/save-project", {
              resumeData: resumeData,
              id:id,
            
          },{headers: {
            'Authorization': `Bearer ${token}`
        }});

          if (response.data.title === 'success') { 
              navigate('/dashboard');
          } else {
              navigate('/create-project');
          }
      } catch (error) {
          console.log('Failed to save resume data.',error);
          navigate('/create-project');
      }
  };

  const [openSections, setOpenSections] = useState({
    project:false,
    personalInformation: false,
    education: false,
    certifications: false,
    achievements: false,
    custom: false,
    workExperience: false,
    skills:false
  });
  
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'template1':
                return <ResumeTemplate resumeData={resumeData} localImage={localImage} ref={resumeRef} />;
            case 'template2':
                return <Resume2 resumeData={resumeData} localImage={localImage} ref={resumeRef}/>;
            default:
                return <ResumeTemplate resumeData={resumeData} ref={resumeRef}/>;
        }
    };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    setResumeData(prevState => {
        let newState = { ...prevState };
        let obj = newState;

        // Navigate to the target object
        for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) {
                obj[keys[i]] = {};
            }
            obj = obj[keys[i]];
        }

        // Set the value
        obj[keys[keys.length - 1]] = value;

        return newState;
    });
};
  const handleDeleteEducation = (index) => {
    setResumeData((prevData) => {
      const updatedEducation = prevData.education.filter((_, i) => i !== index);
      return {
        ...prevData,
        education: updatedEducation,
      };
    });
  };

  const handleSummaryChange = (e) => {
    const { value } = e.target;
    setResumeData((prevData) => ({
        ...prevData,
        summary: value,
    }));
};

  const handleDeleteProject = (index) => {
    setResumeData((prevData) => {
      const updatedEducation = prevData.projects.filter((_, i) => i !== index);
      return {
        ...prevData,
        projects: updatedEducation,
      };
    });
  };
 const handleAchievementDelete=(index)=>{
    setResumeData((prevData)=>{
        const updatedAchievements=prevData.achievements.filter((_,i)=>i!==index);
        return{
            ...prevData,
            achievements:updatedAchievements,
        }
    })
  }
  const handleDeleteExperience=(index)=>{
    setResumeData((prevData)=>{
        const updatedAchievements=prevData.experience.filter((_,i)=>i!==index);
        return{
            ...prevData,
            experience:updatedAchievements,
        }
    })
  }
  const handleDeleteSkill=(index)=>{
    setResumeData((prevData)=>{
        const updatedAchievements=prevData.skills.filter((_,i)=>i!==index);
        return{
            ...prevData,
            skills:updatedAchievements,
        }
    })
  }
  
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    setResumeData(prevState => ({
      ...prevState,
      experience: updatedExperience
    }));
  };
  const handleCustomChange = (index, field, value) => {
    const custom = [...resumeData.customData];
    custom[index] = {
      ...custom[index],
      [field]: value
    };
    setResumeData(prevState => ({
      ...prevState,
      customData: custom
    }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setResumeData(prevState => ({
      ...prevState,
      education: updatedEducation
    }));
  };

  const handleAddExperience = () => {
    setResumeData(prevState => ({
      ...prevState,
      experience: [...prevState.experience, { jobTitle: '', company: '', duration: '', responsibilities: '' }]
    }));
  };
  

  const handleAddEducation = () => {
    setResumeData(prevState => ({
      ...prevState,
      education: [...prevState.education, { degree: '', institution: '', year: '' }]
    }));
  };

  const handleAddCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, { title: '', description: '' }]
    });
  };

  const handleDeleteCertification = (index) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter((_, i) => i !== index)
    });
  };

  const handleCertificationChange = (index, key, value) => {
    const updatedCertifications = resumeData.certifications.map((certification, i) =>
      i === index ? { ...certification, [key]: value } : certification
    );
    setResumeData({
      ...resumeData,
      certifications: updatedCertifications
    });
  };
  const handleAddCustom = () => {
    setResumeData({
      ...resumeData,
      customData: [...resumeData.customData, { title: '', description: '' }]
    });
  };

  // Function to delete a custom data entry by index
  const handleDeleteCustom = (index) => {
    setResumeData({
      ...resumeData,
      customData: resumeData.customData.filter((_, i) => i !== index)
    });
  };
  
  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...resumeData.achievements];
    updatedAchievements[index] = value;
    setResumeData(prevState => ({
      ...prevState,
      achievements: updatedAchievements
    }));
  };
  
  const handleAddAchievement = () => {
    setResumeData(prevState => ({
      ...prevState,
      achievements: [...prevState.achievements, '']
    }));
  };
  
  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[index] = value;
    setResumeData(prevState => ({
      ...prevState,
      skills: updatedSkills
    }));
  };
  
  const handleAddSkill = (skill) => {
    setResumeData(prevState => ({
      ...prevState,
      skills: [...prevState.skills,skill] // Initialize with empty string or suitable default
    }));
  };
  
  
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...resumeData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setResumeData(prevState => ({
      ...prevState,
      projects: updatedProjects
    }));
  };
  
  const handleAddProject = () => {
    setResumeData(prevState => ({
      ...prevState,
      projects: [...prevState.projects, { title: '', description: '' }]
    }));
  };
  
  const resumeRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => resumeRef.current,
    });

   

    const handleDownloadPdf = async () => {
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgProps = pdf.getImageProperties(imgData);

    // Calculate the image's aspect ratio
    const aspectRatio = imgProps.width / imgProps.height;

    // Determine the dimensions for the image in the PDF
    let imgWidth, imgHeight;
    if (pdfWidth / aspectRatio <= pdfHeight) {
        imgWidth = pdfWidth;
        imgHeight = pdfWidth / aspectRatio;
    } else {
        imgHeight = pdfHeight;
        imgWidth = pdfHeight * aspectRatio;
    }

    // Center the image if there is any blank space left due to aspect ratio differences
    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = (pdfHeight - imgHeight) / 2;

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
    pdf.save('resume.pdf');
};


  const sections = [
    
    {
        name: 'personalInformation',
        title: 'Personal Information',
        icon: <FaUser className="mr-2" />,
        isOpen: openSections.personalInformation,
        form: (
          <PersonalInformationForm
            resumeData={resumeData}
            handleChange={handleChange}
            handleSummaryChange={handleSummaryChange}
            localImage={localImage}
            handleFileChange={handleFileChange}
          />
        ),
      },
    
    {
        name: 'education',
        title: 'Education',
        icon: <FaGraduationCap className="mr-2" />,
        isOpen: openSections.education,
        form: (
         <Education
         resumeData={resumeData}
         handleEducationChange={handleEducationChange}
         handleAddEducation={handleAddEducation}
         handleDeleteEducation={handleDeleteEducation}/>
        )
      },
      {
        name: 'achievements',
        title: 'Achievements',
        icon: <FaTrophy className="mr-2" />,
        isOpen: openSections.achievements,
        form: (
         
            <AchievementsForm
            handleAddAchievement={handleAddAchievement}
            handleAchievementChange={handleAchievementChange}
            resumeData={resumeData}
            handleAchievementDelete={handleAchievementDelete}/>
        
        )
      }
      ,
      {
        name: 'custom',
        title: 'Custom',
        icon: <FaCog className="mr-2" />,
        isOpen: openSections.custom,
        form: (
            <Custom
            resumeData={resumeData}
            handleCustomChange={handleCustomChange}
            handleAddCustom={handleAddCustom}
            handleDeleteCustom={handleDeleteCustom}
          />
        )
      }
      ,
      {
        name: 'skills',
        title: 'Skills',
        icon: <FaTools className="mr-2" />,
        isOpen: openSections.skills,
        form: (

                  <SkillsForm
                    skills={resumeData.skills}
                    handleSkillsChange={handleSkillsChange}
                    handleAddSkill={handleAddSkill}
                    handleDeleteSkill={handleDeleteSkill}
                  />

        )
      }
      ,
      {
        name: 'project',
        title: 'Projects',
        icon: <MdSportsMma className="mr-2" />,
        isOpen: openSections.project,
        form: (
          <ProjectForm
            resumeData={resumeData}
            handleProjectChange={handleProjectChange}
            handleAddProject={handleAddProject}
            handleDeleteProject={handleDeleteProject}
          />
        )
      }
      ,
    {
      name: 'workExperience',
      title: 'Work Experience',
      icon: <FaBriefcase className="mr-2" />,
      isOpen: openSections.workExperience,
      form: (
        <>
          <Experience
          resumeData={resumeData}
        handleAddExperience={handleAddExperience}
        handleExperienceChange={handleExperienceChange}
        handleDeleteExperience={handleDeleteExperience}
          />
        </>
      )
    },
    {
        name: 'certifications',
        title: 'Certificate',
        icon: <TbCertificate className="mr-2" />,
        isOpen: openSections.certifications,
        form: (
          <>
            <Certificate
            resumeData={resumeData}
          handleAddCertification={handleAddCertification}
          handleCertificationChange={handleCertificationChange}
          handleDeleteCertification={handleDeleteCertification}
            />
          </>
        )
      },
  ];

  return (
<div className="flex">
            {/* Resizable Sidebar */}
            <div className="sticky top-0 h-screen">
                <ResizableSidebar sections={sections} toggleSection={toggleSection} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Button Container */}
                <div className="flex justify-end mt-4 mr-4">
                    <button onClick={handlePrint} className="btn btn-primary bg-blue-300 mr-2 p-2">Print</button>
                    <button onClick={handleDownloadPdf} className="btn btn-secondary bg-red-300 p-2 mr-2">Download PDF</button>

                    {/* <button onClick={handleDownloadWord} className="btn btn-secondary bg-yellow-300 p-2">Download Word</button> */}
                    <button onClick={handleSave} className="btn btn-secondary bg-green-300 p-2">Save</button>
                </div>
                
                {/* Resume Template */}
                <div>
            <div className="mb-4">
                <label className="mr-2">Choose Template:</label>
                <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="border p-2"
                >
                    <option value="template1">Template 1</option>
                    <option value="template2">Template 2</option>
                </select>
            </div>
            <div>
                {renderTemplate()}
            </div>
        </div>
            </div>
        </div>
  );
};

export default ResumeBuilder;
