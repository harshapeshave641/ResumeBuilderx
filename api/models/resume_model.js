const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' }
});

const experienceSchema = new Schema({
  company: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  duration: { type: String, default: '' },
  responsibilities: { type: String, default: '' }
});

const educationSchema = new Schema({
  institution: { type: String, default: '' },
  degree: { type: String, default: '' },
  year: { type: String, default: '' },
  extraInfo: { type: String, default: '' }
});

const projectSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' }
});

const customDataSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' }
});

const resumeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  header: {
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    contact: { type: contactSchema, default: {} }
  },
  summary: { type: String, default: '' },
  experience: { type: [experienceSchema], default: [] },
  education: { type: [educationSchema], default: [] },
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
  achievements: { type: [String], default: [] },
  projects: { type: [projectSchema], default: [] },
  customData: { type: [customDataSchema], default: [] },
  photo: { type: String, default: '' }
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
