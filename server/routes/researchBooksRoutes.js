const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const researchBookController = require('../controllers/researchBookController'); // Import the controller
const router = express.Router();

// Add a new research book - Only accessible by admins (role_id = 2)
router.post('/add', authenticate, authorize(2), researchBookController.addResearchBook);

// Get all research books
router.get('/', authenticate, researchBookController.getResearchBooks);

// Get a research book by ID
router.get('/:id', authenticate, researchBookController.getResearchBookById);

// Update a research book - Only accessible by admins (role_id = 2)
router.put('/:id', authenticate, authorize(2), researchBookController.updateResearchBook);

// Delete a research book - Only accessible by admins (role_id = 2)
router.delete('/:id', authenticate, authorize(2), researchBookController.deleteResearchBook);

module.exports = router;
