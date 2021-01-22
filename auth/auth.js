const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;


// jwt token verification middleware
passport.use(new JWTstrategy({
    secretOrKey: process.env.JWT_KEY,
    jwtFromRequest: function (req) {
        let token;
        if (req && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        console.log(token);
        return token;
    }
},
async (token, done) => {
    try {
        return done(null, token);
    } catch (error) {
        console.log('Error');
        done(error);
    }
}));