import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleAdd = () => {
    setCurrentResume(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: '',
          specialization: '',
          college: '',
          university: '',
          cgpa: '',
          percentage: '',
          startYear: '',
          endYear: ''
        }
      ]
    }));
  };

  const handleRemove = (index) => {
    setCurrentResume(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setCurrentResume(prev => {
      const newEducation = [...prev.education];
      newEducation[index][name] = value;
      return { ...prev, education: newEducation };
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Education</h3>
        <p className="text-sm text-gray-500 mb-4">Add your educational background starting with the most recent.</p>
      </div>

      {currentResume.education.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <h4 className="font-semibold text-gray-900 mb-4">Education #{index + 1}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree (e.g. B.Tech, 12th)</label>
              <input
                type="text"
                name="degree"
                value={edu.degree || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input
                type="text"
                name="specialization"
                value={edu.specialization || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College/School</label>
              <input
                type="text"
                name="college"
                value={edu.college || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University/Board</label>
              <input
                type="text"
                name="university"
                value={edu.university || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGPA (or Percentage)</label>
              <input
                type="text"
                name="cgpa"
                value={edu.cgpa || edu.percentage || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                placeholder="e.g. 8.5 or 90%"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                <input
                  type="text"
                  name="startYear"
                  value={edu.startYear || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                  placeholder="YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                <input
                  type="text"
                  name="endYear"
                  value={edu.endYear || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                  placeholder="YYYY or Present"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-black hover:text-black transition-colors flex justify-center items-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Education
      </button>
    </div>
  );
};

export default EducationStep;
