const User = require('../models/User');
const Resume = require('../models/Resume');

// @desc    Get stats (total users, total resumes)
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalResumes = await Resume.countDocuments();
        
        // Let's get the 5 most recent users for the dashboard
        const latestUsers = await User.find().sort({ createdAt: -1 }).select('-password').limit(5);

        res.json({
            totalUsers,
            totalResumes,
            latestUsers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            if (user.isAdmin) {
                return res.status(400).json({ message: 'Cannot delete admin user' });
            }
            // Delete user's resumes first
            await Resume.deleteMany({ user: user._id });
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStats,
    getUsers,
    deleteUser
};
