import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import BuilderWizard from '../components/builder/BuilderWizard';
import ResumePreview from '../components/preview/ResumePreview';
import { Loader2 } from 'lucide-react';

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadResume, currentResume, initNewResume } = useResume();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      if (id) {
        try {
          await loadResume(id);
        } catch (error) {
          console.error(error);
          navigate('/dashboard');
        }
      } else {
        if (!currentResume) {
          initNewResume();
        }
      }
      setLoading(false);
    };

    initialize();
  }, [id]);

  if (loading || !currentResume) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* Left side: Builder Wizard */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto border-r border-gray-200 bg-white">
        <BuilderWizard />
      </div>

      {/* Right side: Live Preview */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-gray-100 p-4 lg:p-8 flex justify-center">
        <ResumePreview />
      </div>
    </div>
  );
};

export default Editor;
