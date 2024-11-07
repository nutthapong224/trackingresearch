const ResearchBook = require('../models/ResearchBook'); // Import the ResearchBook model

// Create a new research book (Create)
exports.addResearchBook = async (req, res) => {
  const { title, author, category_id, status } = req.body;

  // Check if all required fields are provided
  if (!title || !author || !category_id || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newResearchBook = await ResearchBook.create(title, author, category_id, status); // Add the book to the database
    res.status(201).json({ message: 'Research book added successfully', researchBook: newResearchBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add research book', error });
  }
};

// Get all research books (Read)
exports.getResearchBooks = async (req, res) => {
  try {
    const researchBooks = await ResearchBook.getAll(); // Fetch all research books
    res.status(200).json({ researchBooks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch research books', error });
  }
};

// Get a research book by ID (Read)
exports.getResearchBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const researchBook = await ResearchBook.getById(id); // Fetch research book by ID
    if (!researchBook) {
      return res.status(404).json({ message: 'Research book not found' });
    }
    res.status(200).json({ researchBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch research book', error });
  }
};

// Update a research book (Update)
exports.updateResearchBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category_id, status } = req.body;

  if (!title || !author || !category_id || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedResearchBook = await ResearchBook.update(id, title, author, category_id, status); // Update book in the database
    if (!updatedResearchBook) {
      return res.status(404).json({ message: 'Research book not found' });
    }
    res.status(200).json({ message: 'Research book updated successfully', researchBook: updatedResearchBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update research book', error });
  }
};

// Delete a research book (Delete)
exports.deleteResearchBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedResearchBook = await ResearchBook.delete(id); // Delete the book from the database
    if (!deletedResearchBook) {
      return res.status(404).json({ message: 'Research book not found' });
    }
    res.status(200).json({ message: 'Research book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete research book', error });
  }
};
