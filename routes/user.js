const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/user');

async function registerUser(req, res) {
    console.log(req.body);
    const { user } = req.body;
    const { username, password, email } = user;
    try {
        User.findOne({email}).then((user) => {
            console.log('MongoDB lookup', user);
            if (user) {
                return res.status(400).json({ error: 'User is already registered'});
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
        res.status(500).json({ error: 'Something went worng' });
    }
}

module.exports = {
    registerUser
};