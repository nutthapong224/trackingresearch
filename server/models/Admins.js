const pool = require('../config/db');

const Admin = {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
  },

  async create(username, password, role) {

    if (role !== 2) {
      throw new Error('Registration is only allowed for role_id 2');
    }

    const [result] = await pool.query(
      'INSERT INTO admins (username, password, role_id) VALUES (?, ?, ?)',
      [username, password, role]
    );
    return result.insertId;
  }
};

module.exports = Admin;
