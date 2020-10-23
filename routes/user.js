const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const generateErrorObject = require('../utils/generateErrorObject');

async function authenticateUser(req, res) {
    console.log(req.body);
    res.status(200).json({message: 'Success'});
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
        User.findOne({email}).then((user) => {
            console.log('MongoDB lookup', user);
            if (user) {
                const message = 'User with this email is already registered';
                return res.status(400).json({ error: generateErrorObject(message, 'email') });
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });
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