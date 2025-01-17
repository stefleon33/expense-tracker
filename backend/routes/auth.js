const express = require('express');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/userModel');
const { generateJWTToken } = require('../controllers/authController');

const router = express.Router();

//Register Route
router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
        body('email')
            .isEmail()
            .withMessage('Invalid email format'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password, email } = req.body;

        try {
            const hashedPassword = User.hashPassword(password);
            
            const newUser = new User({
                username,
                password: hashedPassword,
                email,
            });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Registration failed', error: error.message });
        }
    }
);

//Login Route
router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).json({
                message: 'Authentication failed',
                error:  info?.message || 'Invalid credentials',
            });
        }
        req.login(user, { session: false }, (error) => {
            if (error) {
                return res.status(500).json({error: 'Login error', error: error.message });
            }
            const token = generateJWTToken(user.toJSON());
            return res.status(200).json({ user, token });
        });
    })(req, res);
});

module.exports = router;