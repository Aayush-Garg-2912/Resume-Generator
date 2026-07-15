const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        default: 'Untitled Resume'
    },
    personalInfo: {
        fullName: String,
        phone: String,
        email: String,
        linkedin: String,
        github: String,
        portfolio: String,
        currentCity: String,
        currentState: String,
        professionalTitle: String,
        summary: String,
        photoUrl: String
    },
    education: [{
        degree: String,
        specialization: String,
        college: String,
        university: String,
        cgpa: String,
        percentage: String,
        startYear: String,
        endYear: String
    }],
    skills: {
        frontend: [String],
        backend: [String],
        databases: [String],
        coreSubjects: [String],
        developerTools: [String],
        frameworks: [String],
        libraries: [String],
        cloud: [String],
        versionControl: [String],
        languages: [String]
    },
    experience: [{
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
        currentWorking: Boolean
    }],
    projects: [{
        projectName: String,
        githubLink: String,
        liveDemo: String,
        techStack: [String],
        description: String,
        achievements: String
    }],
    certifications: [{
        certificateName: String,
        organization: String,
        year: String,
        credentialLink: String
    }],
    achievements: [{
        title: String,
        description: String
    }],
    extraActivities: {
        positionsOfResponsibility: [String],
        extraCurricular: [String],
        languagesKnown: [String],
        hobbies: [String],
        interests: [String]
    }
}, {
    timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;
