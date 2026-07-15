import { useResume } from '../../../context/ResumeContext';

const SkillsStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // We store as an array, but user types comma separated string.
    // To handle this, we'll keep the value in state as array, and join/split on change.
    const arrayValue = value.split(',').map(item => item.trim());
    
    setCurrentResume(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: arrayValue
      }
    }));
  };

  const getValue = (name) => {
    return currentResume.skills[name] ? currentResume.skills[name].join(', ') : '';
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Technical Skills</h3>
        <p className="text-sm text-gray-500 mb-4">Add your skills separated by commas.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Languages</label>
          <input
            type="text"
            name="languages"
            value={getValue('languages')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="e.g. C++, Java, Python, JavaScript"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Frontend</label>
          <input
            type="text"
            name="frontend"
            value={getValue('frontend')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="e.g. HTML, CSS, React, Tailwind"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Backend</label>
          <input
            type="text"
            name="backend"
            value={getValue('backend')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="e.g. Node.js, Express, Django"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Databases</label>
          <input
            type="text"
            name="databases"
            value={getValue('databases')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="e.g. MongoDB, MySQL, PostgreSQL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Developer Tools / Cloud</label>
          <input
            type="text"
            name="developerTools"
            value={getValue('developerTools')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="e.g. Git, Docker, AWS, Postman"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Core Subjects</label>
          <input
            type="text"
            name="coreSubjects"
            value={getValue('coreSubjects')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
            placeholder="e.g. Data Structures, OS, DBMS"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsStep;
