const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		// Create new user
		const user = new User({
			firstName,
			lastName,
			email,
			passwordHash,
			roles: ['patient'], // default role
		});

		await user.save();

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.error('Register Error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

// User login
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.passwordHash);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		// Create JWT token
		const token = jwt.sign(
			{ userId: user._id, roles: user.roles },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		res.json({ token });
	} catch (error) {
		console.error('Login Error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = {
	registerUser,
	loginUser,
};