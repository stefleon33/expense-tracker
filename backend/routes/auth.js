const express = require('express');
const passport = require('passport');
const User = require('../models/userModel');
const { generateJWTToken, jwt } = require('../controllers/authController');

const router = express.Router();

//Login Route
router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json({
                message: 'Authentication failed',
                error,
            });
        }
        req.login(user, { session: false }, (error) => {
            if (error) {
                return res.status(500).json({error: 'Login error', details: error});
            }
            const token = generateJWTToken(user.toJSON());
            return res.status(200).json({ user, token });
        });
    })(req, res);
});

//Register Route
router.post('/register', async  (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const hashedPassword = User.hashedPassword(password);
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
});

module.exports = router;