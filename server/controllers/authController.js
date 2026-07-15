const User = require('../models/User');
const Resume = require('../models/Resume');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            // Create a sample resume
            await Resume.create({
                user: user._id,
                title: 'Sample Resume',
                personalInfo: {
                    fullName: name,
                    email: email,
                    phone: '+1 234 567 8900',
                    summary: 'Driven and innovative software developer with experience in building scalable web applications. Passionate about problem-solving and writing clean, maintainable code.',
                    linkedin: 'linkedin.com/in/sample',
                    github: 'github.com/sample'
                },
                education: [{
                    degree: 'Bachelor of Technology',
                    specialization: 'Computer Science',
                    university: 'Sample University',
                    startYear: '2020',
                    endYear: '2024',
                    cgpa: '8.5'
                }],
                skills: {
                    languages: ['JavaScript', 'Python', 'Java'],
                    frontend: ['React.js', 'Tailwind CSS', 'HTML5'],
                    backend: ['Node.js', 'Express', 'MongoDB'],
                    developerTools: ['Git', 'VS Code', 'Docker']
                }
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    authUser,
    getUserProfile
};
