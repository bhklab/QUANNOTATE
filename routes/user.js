const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { user } = req.body;
    try {
        console.log('New user', user);
        res.status(200).json({ message: 'Success'});
    } catch (error) {
        console.log('Error during registration');
        console.log(error);
        res.status(500).json({ message: 'Something went worng' });
    }
}

module.exports = {
    registerUser
};