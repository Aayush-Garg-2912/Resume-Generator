import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const AchievementsStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleAdd = () => {
    setCurrentResume(prev => ({
      ...prev,
      achievements: [
        ...(prev.achievements || []),
        {
          title: '',
          description: ''
        }
      ]
    }));
  };

  const handleRemove = (index) => {
    setCurrentResume(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setCurrentResume(prev => {
      const newAchievements = [...(prev.achievements || [])];
      newAchievements[index][name] = value;
      return { ...prev, achievements: newAchievements };
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Achievements</h3>
        <p className="text-sm text-gray-500 mb-4">Add your key achievements, awards, or hackathon wins.</p>
      </div>

      {(currentResume.achievements || []).map((ach, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <h4 className="font-semibold text-gray-900 mb-4">Achievement #{index + 1}</h4>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
              <input
                type="text"
                name="title"
                value={ach.title || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                placeholder="e.g. Winner, CodeMasters 2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={ach.description || ''}
                onChange={(e) => handleChange(index, e)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black resize-none"
                placeholder="Describe your achievement..."
              ></textarea>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-black hover:text-black transition-colors flex justify-center items-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Achievement
      </button>
    </div>
  );
};

export default AchievementsStep;
