const bcrypt = require('bcryptjs'); // Changed from 'bcrypt' to 'bcryptjs'
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.register = async (req, res) => {
    const { username, password, role_id } = req.body; // Change 'role' to 'role_id'
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = await User.create(username, hashedPassword, role_id);
      res.status(201).json({ message: 'User created', userId });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error });
    }
  };

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
