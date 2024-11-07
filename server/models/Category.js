const pool = require('../config/db'); // Import your database connection

const Category = {
  // Create a new category
  async create(name) {
    const [result] = await pool.query(
      'INSERT INTO categories (name, created_at, updated_at) VALUES (?, NOW(), NOW())',
      [name]
    );
    return { id: result.insertId, name };
  },

  // Get all categories
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM categories');
    return rows;
  },

  // Get a category by ID
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0]; // Return the first result or undefined if not found
  },

  // Update a category by ID
  async update(id, name) {
    const [result] = await pool.query(
      'UPDATE categories SET name = ?, updated_at = NOW() WHERE id = ?',
      [name, id]
    );
    return result.affectedRows > 0 ? { id, name } : null;
  },

  // Delete a category by ID
  async delete(id) {
    const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Category;
