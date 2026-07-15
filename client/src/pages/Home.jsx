import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-black text-white p-4 rounded-2xl shadow-lg">
            <FileText className="h-16 w-16" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          The Ultimate <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">ATS-Friendly</span> Resume Builder
        </h1>
        <p className="mt-4 text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Create a professional, minimalist resume that passes Applicant Tracking Systems with flying colors. Built for developers and professionals.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          {user ? (
            <Link to="/dashboard" className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Build Your Resume Now
            </Link>
          )}
          <a href="#features" className="bg-white text-black border border-gray-200 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
            See Features
          </a>
        </div>
      </motion.div>

      <div id="features" className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        <FeatureCard 
          title="ATS Optimized" 
          description="Clean, structured templates that parse perfectly in all major Applicant Tracking Systems."
        />
        <FeatureCard 
          title="Live Preview" 
          description="See your resume update in real-time as you fill out the multi-step builder wizard."
        />
        <FeatureCard 
          title="High Quality PDF" 
          description="Export pixel-perfect, print-ready PDFs with selectable text and proper margins."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start text-left"
  >
    <CheckCircle className="h-8 w-8 text-black mb-4" />
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </motion.div>
);

export default Home;
