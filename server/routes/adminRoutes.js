const express = require('express');
const router = express.Router();
const { getStats, getUsers, deleteUser } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/stats', protect, admin, getStats);
router.route('/users')
    .get(protect, admin, getUsers);
router.route('/users/:id')
    .delete(protect, admin, deleteUser);

module.exports = router;
