const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const Resume = require('../models/Resume');

router.post('/:resumeId/photo', protect, upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const resume = await Resume.findById(req.params.resumeId);

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        if (resume.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const photoUrl = `/uploads/${req.file.filename}`;
        
        resume.personalInfo = resume.personalInfo || {};
        resume.personalInfo.photoUrl = photoUrl;

        await resume.save();

        res.json({
            message: 'Photo uploaded successfully',
            photoUrl: photoUrl
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
