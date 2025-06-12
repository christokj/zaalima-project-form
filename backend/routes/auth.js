const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup
router.post('/signup', async (req, res) => {
    const { username, name, age, mobile, password } = req.body;
    try {
        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ message: 'Username already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, name, age, mobile, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Account created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).json({ token, username, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/dashboard', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;
