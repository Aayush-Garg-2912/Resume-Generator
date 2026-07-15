import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Download, Copy, Trash2, FileText, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useResume } from '../context/ResumeContext';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { initNewResume } = useResume();
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get('/resumes');
      setResumes(res.data);
    } catch (error) {
      console.error('Error fetching resumes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/resumes/${id}`);
        setResumes(resumes.filter(r => r._id !== id));
      } catch (error) {
        console.error('Error deleting resume', error);
      }
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const res = await api.post(`/resumes/${id}/duplicate`);
      setResumes([res.data, ...resumes]);
    } catch (error) {
      console.error('Error duplicating resume', error);
    }
  };

  const handleCreateNew = () => {
    initNewResume();
    navigate('/editor');
  };

  const handleDownload = async (id) => {
    try {
      // Need to use the raw token since we need blob response
      const token = JSON.parse(localStorage.getItem('user')).token;
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/resumes/${id}/pdf`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Failed to generate PDF from server');
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error downloading PDF from server, falling back to browser print:', error);
      // Fallback: Open the preview page and let the user print it using the browser
      alert("Server PDF generation failed. Opening preview for you to save as PDF via browser print (Ctrl+P / Cmd+P).");
      window.open(`/preview/${id}?print=true`, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Resumes</h1>
        <button
          onClick={handleCreateNew}
          className="bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create Resume
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
        </div>
      ) : resumes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No resumes yet</h3>
          <p className="text-gray-500 mb-6">Create your first ATS-friendly resume to get started.</p>
          <button
            onClick={handleCreateNew}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create First Resume
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={resume._id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <FileText className="w-8 h-8 text-black" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{resume.title}</h3>
                <p className="text-sm text-gray-500">
                  {resume.personalInfo?.professionalTitle || 'No title specified'}
                </p>
              </div>
              
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                <div className="flex gap-2">
                  <Link 
                    to={`/editor/${resume._id}`}
                    className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </Link>
                  <button 
                    onClick={() => handleDownload(resume._id)}
                    className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDuplicate(resume._id)}
                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(resume._id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
