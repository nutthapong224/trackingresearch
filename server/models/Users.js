const pool = require('../config/db');

const User = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  async create(username, password, role) {

    if (role !== 1) {
      throw new Error('Registration is only allowed for role_id 1');
    }

    const [result] = await pool.query(
      'INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)',
      [username, password, role]
    );
    return result.insertId;
  }
};

module.exports = User;
