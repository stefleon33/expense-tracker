const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

const generateJWTToken = (user) => { 
    return jwt.sign(user, jwtSecret, {
        subject:user.username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
};

module.exports =  {
    generateJWTToken
};