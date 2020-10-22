const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

async function registerUser(req, res) {
    const { user } = req.body;
    const { username, password, email } = user;
    try {
        User.findOne({email}).then((user) => {
            console.log('MongoDB lookup', user);
            if (user) {
                return res.status(400).json({error: 'User is already registered'});
            } else {
                const newUser = new User({
                    username,
                    email,
                    password
                });
                newUser.save(function (err) {
                    console.log(err);
                    if (err) res.status(500).json({error: err});
                    return res.status(200).json({ message: 'User saved', newUser });
                });
            }
        });
    } catch (error) {
        console.log('Error during registration');
        console.log(error);
        res.status(500).json({ message: 'Something went worng' });
    }
}

module.exports = {
    registerUser
};