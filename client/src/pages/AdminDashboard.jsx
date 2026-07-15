import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Trash2, Shield, Activity, TrendingUp } from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalResumes: 0, latestUsers: [] });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/users')
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error fetching admin data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user and all their resumes?')) {
      try {
        await api.delete(`/admin/users/${id}`);
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Error deleting user', error);
        alert(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <Activity className="w-10 h-10 animate-pulse text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="w-8 h-8 text-black" />
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 p-4 rounded-xl text-green-600">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Resumes Created</p>
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalResumes}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5" /> Manage Users
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-white">
                <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Joined</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Role</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    {user.isAdmin ? (
                      <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-semibold">Admin</span>
                    ) : (
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-semibold">User</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {!user.isAdmin && (
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
