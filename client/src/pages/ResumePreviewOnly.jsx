import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/preview/ResumePreview';
import { Loader2 } from 'lucide-react';

const ResumePreviewOnly = () => {
  const { id } = useParams();
  const { loadResume, currentResume } = useResume();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        await loadResume(id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchResume();
  }, [id]);

  // Auto-print if query parameter is present
  useEffect(() => {
    if (currentResume && !loading) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('print') === 'true') {
        setTimeout(() => {
          window.print();
        }, 1000); // give it a second to render images etc
      }
    }
  }, [currentResume, loading]);

  if (loading || !currentResume) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white min-h-screen w-full flex justify-center">
      <ResumePreview />
    </div>
  );
};

export default ResumePreviewOnly;
