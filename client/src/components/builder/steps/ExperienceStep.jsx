import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleAdd = () => {
    setCurrentResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
          currentWorking: false
        }
      ]
    }));
  };

  const handleRemove = (index) => {
    setCurrentResume(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    setCurrentResume(prev => {
      const newExp = [...prev.experience];
      newExp[index][name] = type === 'checkbox' ? checked : value;
      return { ...prev, experience: newExp };
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Work Experience</h3>
        <p className="text-sm text-gray-500 mb-4">Add your relevant work experience starting with the most recent.</p>
      </div>

      {currentResume.experience.map((exp, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <h4 className="font-semibold text-gray-900 mb-4">Experience #{index + 1}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization</label>
              <input
                type="text"
                name="company"
                value={exp.company || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role/Job Title</label>
              <input
                type="text"
                name="role"
                value={exp.role || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={exp.startDate || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                  placeholder="MMM YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="text"
                  name="endDate"
                  value={exp.endDate || ''}
                  onChange={(e) => handleChange(index, e)}
                  disabled={exp.currentWorking}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black ${exp.currentWorking ? 'bg-gray-100 text-gray-400' : ''}`}
                  placeholder="MMM YYYY"
                />
              </div>
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="currentWorking"
                checked={exp.currentWorking || false}
                onChange={(e) => handleChange(index, e)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                id={`currentWorking-${index}`}
              />
              <label htmlFor={`currentWorking-${index}`} className="ml-2 block text-sm text-gray-900">
                I currently work here
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Bullet points)</label>
              <textarea
                name="description"
                value={exp.description || ''}
                onChange={(e) => handleChange(index, e)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black resize-none"
                placeholder="- Developed a feature that increased user retention by 20%&#10;- Led a team of 5 engineers..."
              ></textarea>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-black hover:text-black transition-colors flex justify-center items-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Experience
      </button>
    </div>
  );
};

export default ExperienceStep;
