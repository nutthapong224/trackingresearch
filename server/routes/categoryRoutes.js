const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController'); // Import the controller
const router = express.Router();

// Add a new category - Only accessible by admins (role_id = 2)
router.post('/add', authenticate, authorize(2), categoryController.addCategory);

// Get all categories
router.get('/', authenticate, categoryController.getCategories);

// Get a category by ID
router.get('/:id', authenticate, categoryController.getCategoryById);

// Update a category - Only accessible by admins (role_id = 2)
router.put('/:id', authenticate, authorize(2), categoryController.updateCategory);

// Delete a category - Only accessible by admins (role_id = 2)
router.delete('/:id', authenticate, authorize(2), categoryController.deleteCategory);

module.exports = router;
