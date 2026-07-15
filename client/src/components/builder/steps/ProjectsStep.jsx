import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleAdd = () => {
    setCurrentResume(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          projectName: '',
          githubLink: '',
          liveDemo: '',
          techStack: [],
          description: '',
          achievements: ''
        }
      ]
    }));
  };

  const handleRemove = (index) => {
    setCurrentResume(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setCurrentResume(prev => {
      const newProjects = [...prev.projects];
      if (name === 'techStack') {
        newProjects[index][name] = value.split(',').map(v => v.trim());
      } else {
        newProjects[index][name] = value;
      }
      return { ...prev, projects: newProjects };
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Projects</h3>
        <p className="text-sm text-gray-500 mb-4">Add your best projects.</p>
      </div>

      {currentResume.projects.map((proj, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <h4 className="font-semibold text-gray-900 mb-4">Project #{index + 1}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                name="projectName"
                value={proj.projectName || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
              <input
                type="text"
                name="githubLink"
                value={proj.githubLink || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo Link</label>
              <input
                type="text"
                name="liveDemo"
                value={proj.liveDemo || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                name="techStack"
                value={proj.techStack ? proj.techStack.join(', ') : ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={proj.description || ''}
                onChange={(e) => handleChange(index, e)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black resize-none"
                placeholder="Describe your project, your role, and the impact..."
              ></textarea>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-black hover:text-black transition-colors flex justify-center items-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Project
      </button>
    </div>
  );
};

export default ProjectsStep;
