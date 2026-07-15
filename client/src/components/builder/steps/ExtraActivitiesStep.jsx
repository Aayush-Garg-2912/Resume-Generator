import { useResume } from '../../../context/ResumeContext';

const ExtraActivitiesStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleArrayChange = (field, e) => {
    const value = e.target.value;
    // Split by newline so users can easily type bullet points
    const arrayValue = value.split('\n');
    
    setCurrentResume(prev => ({
      ...prev,
      extraActivities: {
        ...(prev.extraActivities || {}),
        [field]: arrayValue
      }
    }));
  };

  const getArrayValue = (field) => {
    if (!currentResume.extraActivities) return '';
    const arr = currentResume.extraActivities[field];
    return arr ? arr.join('\n') : '';
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Extra-Curricular & Positions</h3>
        <p className="text-sm text-gray-500 mb-4">Add your responsibilities and activities. Write each point on a new line.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Positions of Responsibility</label>
          <p className="text-xs text-gray-400 mb-2">Write each role on a new line. You can format like "Role - Description"</p>
          <textarea
            value={getArrayValue('positionsOfResponsibility')}
            onChange={(e) => handleArrayChange('positionsOfResponsibility', e)}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black resize-y"
            placeholder="Student Coordinator - Assisted in organizing events...&#10;Class Representative - Coordinated communication..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extra-Curricular Activities</label>
          <p className="text-xs text-gray-400 mb-2">Write each activity on a new line.</p>
          <textarea
            value={getArrayValue('extraCurricular')}
            onChange={(e) => handleArrayChange('extraCurricular', e)}
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black resize-y"
            placeholder="Participated in the Annual Sports Meet...&#10;Volunteered for XYZ NGO..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ExtraActivitiesStep;
