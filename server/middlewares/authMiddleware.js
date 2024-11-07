const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to req.user
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

exports.authorize = (requiredRole) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }

  if (req.user.role_id !== requiredRole) {
    return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
  }

  next();
};
