const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const generateErrorObject = require('../utils/generateErrorObject');

// sets expiration time for jwt tokens and cookies
const expirationTime = 60 * 60; // 1 hour

async function authenticateUser(req, res) {
    try {
        const { user } = req.body;
        if (!user) {
            res.status(400).json({ error: generateErrorObject('User information is missing', 'generic') });
        }
        const { password, email } = user;
        if (!password || !email) {
            res.status(400).json({ error: generateErrorObject('Some fields are missing', 'generic') });
        }
        // finds user by email address
        User.findOne({ email }).then((user) => {
            if (!user) {
                res.status(400).json({ error: generateErrorObject('There is no user with this email address', 'email')});
                return;
            }
            const { username } = user;
            // check if user provided correct provided
            user.isPasswordMatch(password).then(result => {
                if (result) {
                    //expiresIn is being set in seconds
                    const jwtToken = jwt.sign({ username, email }, process.env.JWT_KEY, { expiresIn: expirationTime });
                    // maxAge is being set in milliseconds
                    res.cookie('token', jwtToken, { maxAge: expirationTime * 1000, httpOnly: true }).json({ message: 'You are logged in', authenticated: true, username, email });
                } else {
                    res.status(400).json({ error: generateErrorObject('Wrong password', 'password')});
                }
            }).catch(err => {
                console.log('Error while comparing hash and password', err);
                res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
            });
        });
    } catch (error) {
        console.log('Error during authentication');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

async function registerUser(req, res) {
    try {
        const { user } = req.body;
        if (!user) {
            res.status(400).json({ error: generateErrorObject('User information is missing', 'generic') });
        }
        const { username, password, email } = user;
        if (!username || !password || !email) {
            res.status(400).json({ error: generateErrorObject('Some fields are missing', 'generic') });
        }
        // checks if user with this email address was already created
        User.findOne({email}).then((user) => {
            if (user) {
                const message = 'User with this email is already registered';
                return res.status(400).json({ error: generateErrorObject(message, 'email') });
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });
                // attempts to save new user
                newUser.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ error: err });
                        return;
                    }
                    //expiresIn is being set in seconds
                    const jwtToken = jwt.sign({ username, email }, process.env.JWT_KEY, { expiresIn: expirationTime });
                    // maxAge is being set in milliseconds
                    res.cookie('token', jwtToken, { maxAge: expirationTime * 1000, httpOnly: true }).json({ message: 'User saved', authenticated: true, username, email });
                });
            }
        });
    } catch (error) {
        console.log('Error during registration');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

async function checkToken(req, res) {
    try {
        const { cookies } = req;
        if (!cookies || !cookies.token) {
            res.status(200).json({ message: 'User is not logged in', authenticated: false, });
        } else {
            jwt.verify(cookies.token, process.env.JWT_KEY, function (err, decoded) {
                if (err) {
                    res.status(400).json({ authenticated: false, error: generateErrorObject('token couldn\'t be verified' , 'generic') });
                } else {
                    res.status(200).json({ authenticated: true, username: decoded.username, message: 'User is logged in'});
                }
            });
        }

    } catch (error) {
        console.log('Error during token verification');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

module.exports = {
    registerUser,
    authenticateUser,
    checkToken
};