const express = require('express');
const router = express.Router();
const User = require('./models/users_model'); // Import your User model
const Resume=require('./models/resume_model')
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const bcrypt = require('bcryptjs'); // Import bcrypt
const jwt = require('jsonwebtoken');

// Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { userId: newUser._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } // Adjust expiration as needed
        );

        // Send the response with the token
        res.status(201).json({
            message: 'User registered successfully',
            token
        });

    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Create a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key from .env
            { expiresIn: '1h' } // Token expiry
        );

        // Send the token in the response
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer token" format

    if (token == null) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Protected route example
router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        // Access user from req.user
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const projects = await Resume.find({ user: req.user.userId });


        res.status(200).json({
            message: 'Welcome to the dashboard',
            user: {
                username: user.username,
                email: user.email
            },
            projects:projects
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/create-project/:id', authenticateToken, async (req, res) => {
    try {
      const resume = await Resume.findById(req.params.id);
      if (!resume) {
        return res.status(404).json({ message: 'Resume not found' });
      }
      res.json(resume);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.post('/save-project', authenticateToken, async (req, res) => {
    try {
      console.log(req.user);
      const userId = req.user.userId;
      console.log(userId);
      const { id, resumeData } = req.body;
  
      let resume;
      if (id) {
        // Update existing resume
        resume = await Resume.findByIdAndUpdate(id, {
          user: userId,
          ...resumeData
        });
      } else {
        // Create new resume, ensure _id is not passed
        resume = new Resume({
          user: userId,
          header: resumeData.header,
          summary: resumeData.summary,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          certifications: resumeData.certifications,
          achievements: resumeData.achievements,
          projects: resumeData.projects,
          customData: resumeData.customData,
          photo: resumeData.photo
        });
        await resume.save();
      }
  
      res.json({ title: "success", resume });
    } catch (error) {
      console.error('Error saving resume data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.delete('/delete-project/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params; // Resume ID from request parameters
        const userId = req.user._id; // Extract the user ID from the authenticated user
        console.log(id,userId)
        // Find and delete the resume
        const result = await Resume.findOneAndDelete({ _id: id });
        console.log(result)
        if (!result) {
            // Resume not found or does not belong to the user
            return res.status(404).json({ message: 'Resume not found or you do not have permission to delete this resume' });
        }

        // Successfully deleted
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;
