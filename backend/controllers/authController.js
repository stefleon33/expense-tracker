const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

const generateJWTToken = (user) => { 
    return jwt.sign(user, jwtSecret, {
        subject:user.username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
};

module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user:user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token =generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}module.exports =  {
    generateJWTToken
};