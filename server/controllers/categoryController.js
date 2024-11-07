const Category = require('../models/Category'); // Import the Category model

// Create a new category (Create)
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const newCategory = await Category.create(name); // Add the category to the database
    res.status(201).json({ message: 'Category added successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add category', error });
  }
};

// Get all categories (Read)
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.getAll(); // Fetch all categories
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};

// Get a category by ID (Read)
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.getById(id); // Fetch category by ID
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch category', error });
  }
};

// Update a category (Update)
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }

  try {
    const updatedCategory = await Category.update(id, name); // Update category in the database
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update category', error });
  }
};

// Delete a category (Delete)
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.delete(id); // Delete category from the database
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete category', error });
  }
};
