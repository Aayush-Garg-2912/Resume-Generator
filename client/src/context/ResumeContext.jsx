import { createContext, useState, useContext, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const ResumeContext = createContext();

export const useResume = () => {
    return useContext(ResumeContext);
};

export const ResumeProvider = ({ children }) => {
    const { user } = useAuth();
    const [currentResume, setCurrentResume] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    
    // Default empty resume structure
    const getEmptyResume = () => ({
        title: 'Untitled Resume',
        personalInfo: {
            fullName: '',
            phone: '',
            email: '',
            linkedin: '',
            github: '',
            portfolio: '',
            currentCity: '',
            currentState: '',
            professionalTitle: '',
            summary: '',
            photoUrl: ''
        },
        education: [],
        skills: {
            frontend: [],
            backend: [],
            databases: [],
            coreSubjects: [],
            developerTools: [],
            frameworks: [],
            libraries: [],
            cloud: [],
            versionControl: [],
            languages: []
        },
        experience: [],
        projects: [],
        certifications: [],
        achievements: [],
        extraActivities: {
            positionsOfResponsibility: [],
            extraCurricular: [],
            languagesKnown: [],
            hobbies: [],
            interests: []
        }
    });

    const initNewResume = () => {
        setCurrentResume(getEmptyResume());
    };

    const loadResume = async (id) => {
        try {
            const res = await api.get(`/resumes/${id}`);
            setCurrentResume(res.data);
            return res.data;
        } catch (error) {
            console.error('Error loading resume:', error);
            throw error;
        }
    };

    const saveResume = async (resumeData) => {
        setIsSaving(true);
        try {
            let res;
            if (resumeData._id) {
                // Update existing
                res = await api.put(`/resumes/${resumeData._id}`, resumeData);
            } else {
                // Create new
                res = await api.post('/resumes', resumeData);
            }
            setCurrentResume(res.data);
            return res.data;
        } catch (error) {
            console.error('Error saving resume:', error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    // Auto save using debounce could be implemented here or in the component
    
    const value = {
        currentResume,
        setCurrentResume,
        initNewResume,
        loadResume,
        saveResume,
        isSaving
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};
