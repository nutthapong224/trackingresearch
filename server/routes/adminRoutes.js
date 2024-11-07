const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middlewares/authMiddleware'); // Import your middlewares
const router = express.Router();

// Admin registration route - Only accessible for users trying to register as admin
router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/dashboard', authenticate, authorize(2), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard!' });
});
router.get('/manage-users', authenticate, authorize(2), (req, res) => {
  res.json({ message: 'Admin user management page.' });
});

// Export the admin router
module.exports = router;
