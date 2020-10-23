const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const generateErrorObject = require('../utils/generateErrorObject');

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
            // check if user provided correct provided
            user.isPasswordMatch(password).then(result => {
                if (result) {
                    res.status(200).json({ message: 'You are logged in' });
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
                    return res.status(200).json({ message: 'User saved', newUser });
                });
            }
        });
    } catch (error) {
        console.log('Error during registration');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

module.exports = {
    registerUser,
    authenticateUser
};