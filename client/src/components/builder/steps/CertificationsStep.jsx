import { useResume } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const CertificationsStep = () => {
  const { currentResume, setCurrentResume } = useResume();

  const handleAdd = () => {
    setCurrentResume(prev => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        {
          certificateName: '',
          organization: '',
          year: '',
          credentialLink: ''
        }
      ]
    }));
  };

  const handleRemove = (index) => {
    setCurrentResume(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setCurrentResume(prev => {
      const newCerts = [...(prev.certifications || [])];
      newCerts[index][name] = value;
      return { ...prev, certifications: newCerts };
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Certifications</h3>
        <p className="text-sm text-gray-500 mb-4">Add your relevant certifications and courses.</p>
      </div>

      {(currentResume.certifications || []).map((cert, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50">
          <button
            onClick={() => handleRemove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          
          <h4 className="font-semibold text-gray-900 mb-4">Certification #{index + 1}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name</label>
              <input
                type="text"
                name="certificateName"
                value={cert.certificateName || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                placeholder="e.g. AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization / Platform</label>
              <input
                type="text"
                name="organization"
                value={cert.organization || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                placeholder="e.g. Amazon Web Services"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credential Link (Optional)</label>
              <input
                type="text"
                name="credentialLink"
                value={cert.credentialLink || ''}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-black hover:text-black transition-colors flex justify-center items-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Certification
      </button>
    </div>
  );
};

export default CertificationsStep;
