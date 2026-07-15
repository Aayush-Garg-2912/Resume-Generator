import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <FileText className="h-8 w-8 text-black" />
              <span className="text-xl font-bold text-black tracking-tight">CQST Builder</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-md transition-colors">
                  Dashboard
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-md transition-colors">
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <UserIcon className="w-4 h-4" />
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-black font-medium px-3 py-2 rounded-md transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
