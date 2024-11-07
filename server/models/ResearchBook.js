const pool = require('../config/db'); // Import your database connection

const ResearchBook = {
  // Create a new research book
  async create(title, author, category_id, status) {
    const [result] = await pool.query(
      'INSERT INTO research_books (title, author, category_id, status, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [title, author, category_id, status]
    );
    return { id: result.insertId, title, author, category_id, status };
  },

  // Get all research books
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM research_books');
    return rows;
  },

  // Get a research book by ID
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM research_books WHERE id = ?', [id]);
    return rows[0]; // Return the first result or undefined if not found
  },

  // Update a research book by ID
  async update(id, title, author, category_id, status) {
    const [result] = await pool.query(
      'UPDATE research_books SET title = ?, author = ?, category_id = ?, status = ?, updated_at = NOW() WHERE id = ?',
      [title, author, category_id, status, id]
    );
    return result.affectedRows > 0 ? { id, title, author, category_id, status } : null;
  },

  // Delete a research book by ID
  async delete(id) {
    const [result] = await pool.query('DELETE FROM research_books WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = ResearchBook;
