import { useResume } from '../../../context/ResumeContext';

const PersonalInfoStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentResume(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleTitleChange = (e) => {
    setCurrentResume(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Resume Details</h3>
        <p className="text-sm text-gray-500 mb-4">Name your resume for internal tracking.</p>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume Title</label>
          <input
            type="text"
            name="title"
            value={currentResume.title || ''}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="e.g. Software Engineer Role"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Personal Details</h3>
        <p className="text-sm text-gray-500 mb-4">Get started with the basic details.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={currentResume.personalInfo.fullName || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
            <input
              type="text"
              name="professionalTitle"
              value={currentResume.personalInfo.professionalTitle || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              placeholder="e.g. Full Stack Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={currentResume.personalInfo.email || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={currentResume.personalInfo.phone || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={currentResume.personalInfo.linkedin || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
            <input
              type="text"
              name="github"
              value={currentResume.personalInfo.github || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="currentCity"
              value={currentResume.personalInfo.currentCity || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State/Country</label>
            <input
              type="text"
              name="currentState"
              value={currentResume.personalInfo.currentState || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-1">Professional Summary</h3>
        <p className="text-sm text-gray-500 mb-4">Write a short 2-3 sentence summary about your career.</p>
        <textarea
          name="summary"
          value={currentResume.personalInfo.summary || ''}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black resize-none"
        ></textarea>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
