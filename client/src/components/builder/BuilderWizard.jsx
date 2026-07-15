import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Save, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import PersonalInfoStep from './steps/PersonalInfoStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ExperienceStep from './steps/ExperienceStep';
import ProjectsStep from './steps/ProjectsStep';
import CertificationsStep from './steps/CertificationsStep';
import AchievementsStep from './steps/AchievementsStep';
import ExtraActivitiesStep from './steps/ExtraActivitiesStep';

const STEPS = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Education' },
  { id: 3, title: 'Skills' },
  { id: 4, title: 'Experience' },
  { id: 5, title: 'Projects' },
  { id: 6, title: 'Certifications' },
  { id: 7, title: 'Achievements' },
  { id: 8, title: 'Extra Activities' }
];

const BuilderWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { currentResume, saveResume, isSaving } = useResume();

  const handleSave = async () => {
    try {
      await saveResume(currentResume);
      alert('Resume saved successfully!');
    } catch (error) {
      alert('Failed to save resume');
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep />;
      case 2: return <EducationStep />;
      case 3: return <SkillsStep />;
      case 4: return <ExperienceStep />;
      case 5: return <ProjectsStep />;
      case 6: return <CertificationsStep />;
      case 7: return <AchievementsStep />;
      case 8: return <ExtraActivitiesStep />;
      default: return <PersonalInfoStep />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header & Progress */}
      <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Step {currentStep} of {STEPS.length}
          </h2>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            {isSaving ? <span className="animate-pulse">Saving...</span> : <><Save className="w-4 h-4" /> Save</>}
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 font-medium">{STEPS[currentStep - 1].title}</div>
      </div>

      {/* Step Content */}
      <div className="flex-grow p-6 overflow-y-auto">
        {renderStepContent()}
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-gray-100 bg-white flex justify-between">
        <button 
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-1 ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
        >
          <ChevronLeft className="w-5 h-5" /> Previous
        </button>
        
        {currentStep < STEPS.length ? (
          <button 
            onClick={nextStep}
            className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 flex items-center gap-1"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 flex items-center gap-1"
          >
            <Check className="w-5 h-5" /> Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default BuilderWizard;
