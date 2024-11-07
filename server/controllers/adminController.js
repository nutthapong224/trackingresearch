const bcrypt = require('bcryptjs'); // Changed from 'bcrypt' to 'bcryptjs'
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admins');

exports.register = async (req, res) => {
  const { username, password, role_id } = req.body;

  try {
 
    if (role_id !== 2) {
      return res.status(403).json({ message: 'Only admins (role_id = 2) can register here.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminId = await Admin.create(username, hashedPassword, role_id);

    res.status(201).json({ message: 'Admin created', adminId });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findByUsername(username);

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: admin.id, role_id: admin.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
