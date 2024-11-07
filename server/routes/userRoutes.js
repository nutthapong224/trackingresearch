const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'User profile', user: req.user });
});

// Example protected route for regular users (role_id = 1)
router.get('/dashboard', authenticate, authorize(1), (req, res) => {
  res.send('Welcome to the User Dashboard!');
});

module.exports = router;
