const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportJWT = require('passport-jwt'),
    User = require('./models/userModel.cjs');
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

//Local Strategy
passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, callback) =>{
            try {
                const user = await User.findOne({ username:username });
                if (!user) {
                    console.log('Invalid credentials');
                    return callback(null, false, {
                        message: 'Invalid credentials.',
                    });
                }
                if (!user.validatePassword(password)) {
                    console.log('Invalid credentials.');
                    return callback(null, false, {
                        message: 'Invalid credentials.',
                    });
                }
                console.log('finished');
                return callback(null, user);
            } catch (error) {
                console.log(error);
                return callback(error);
            }
        }
    )
);

//JWT Strategy
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, async (jwtPayload, callback) => {
  return await Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));