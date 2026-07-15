const Resume = require('../models/Resume');
const generatePDF = require('../utils/pdfGenerator');

// @desc    Get logged in user resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ updatedAt: -1 });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (resume) {
            // Check if user owns resume
            if (resume.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(resume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
    try {
        const resume = new Resume({
            user: req.user._id,
            title: req.body.title || 'Untitled Resume',
            ...req.body
        });

        const createdResume = await resume.save();
        res.status(201).json(createdResume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (resume) {
            if (resume.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            Object.assign(resume, req.body);
            const updatedResume = await resume.save();
            res.json(updatedResume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (resume) {
            if (resume.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            await resume.deleteOne();
            res.json({ message: 'Resume removed' });
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Duplicate a resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
const duplicateResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (resume) {
            if (resume.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            const resumeData = resume.toObject();
            delete resumeData._id;
            delete resumeData.createdAt;
            delete resumeData.updatedAt;
            resumeData.title = `${resumeData.title} (Copy)`;

            const newResume = new Resume(resumeData);
            const createdResume = await newResume.save();
            res.status(201).json(createdResume);
        } else {
            res.status(404).json({ message: 'Resume not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Download a resume as PDF
// @route   GET /api/resumes/:id/pdf
// @access  Private
const downloadPdf = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Check if user owns resume or is admin
        if (resume.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Pass the token to Puppeteer so it can authenticate
        const token = req.headers.authorization.split(' ')[1];
        const pdfBuffer = await generatePDF(req.params.id, token);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${resume.title || 'resume'}.pdf"`,
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate PDF' });
    }
};

module.exports = {
    getResumes,
    getResumeById,
    createResume,
    updateResume,
    deleteResume,
    duplicateResume,
    downloadPdf
};
