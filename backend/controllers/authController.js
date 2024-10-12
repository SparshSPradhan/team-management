const User = require('../models/User');
const jwt = require('jsonwebtoken');

// added temporary admin credentials
const adminUsername = "admin"
const adminPassword = "password"

// Register User
const registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    const userExists = await User.findOne({ username });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password, role });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            role: user.role,
            token: generateToken(user._id),
            teamId: user.teamId,
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (username === adminUsername && password == adminPassword ) {
        res.json({
            username: username,
            role: "admin",
            token: generateToken(1),
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = { registerUser, loginUser, loginAdmin };
