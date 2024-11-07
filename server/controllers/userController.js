// const User = require('../models/User'); // Import the User model

// // Create a new user (Create)
// exports.createUser = async (req, res) => {
//   const { username, password, role_id } = req.body; // Accept role_id for user creation

//   if (!username || !password || !role_id) {
//     return res.status(400).json({ message: 'Username, password, and role_id are required' });
//   }

//   try {
//     const newUser = await User.create(username, password, role_id); // Add the user to the database
//     res.status(201).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to create user', error });
//   }
// };

// // Get all users (Read)
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.getAll(); // Fetch all users
//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch users', error });
//   }
// };

// // Get a user by ID (Read)
// exports.getUserById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.getById(id); // Fetch user by ID
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ user });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch user', error });
//   }
// };

// // Update a user (Update)
// exports.updateUser = async (req, res) => {
//   const { id } = req.params;
//   const { username, password, role_id } = req.body; // Accept role_id for user update

//   if (!username || !password || !role_id) {
//     return res.status(400).json({ message: 'Username, password, and role_id are required' });
//   }

//   try {
//     const updatedUser = await User.update(id, username, password, role_id); // Update user in the database
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User updated successfully', user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update user', error });
//   }
// };

// // Delete a user (Delete)
// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedUser = await User.delete(id); // Delete user from the database
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to delete user', error });
//   }
// };
