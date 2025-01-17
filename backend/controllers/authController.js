const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist.cjs');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

const generateJWTToken = (user) => { 
    return jwt.sign(user, jwtSecret, {
        subject:user.username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
};

const addToBlacklist = async (token) => {
    const blacklistedToken = new Blacklist({ token });
    await blacklistedToken.save();
};

module.exports =  {
    generateJWTToken,
    addToBlacklist
};