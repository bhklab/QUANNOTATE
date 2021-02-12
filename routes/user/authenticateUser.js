const jwt = require('jsonwebtoken');
const { User } = require('../../database/models/index');
const generateErrorObject = require('../../utils/generateErrorObject');

// sets expiration time for jwt tokens and cookies
const expirationTime = 60 * 60; // 1 hour

function authenticateUser(req, res) {
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
                res.status(400).json({ error: generateErrorObject('There is no user with this email address', 'email') });
                return;
            }
            const { username, _id, verified } = user;

            // check if user provided correct provided
            user.isPasswordMatch(password).then(result => {
                if (!verified) {
                    res.status(400).json({ error: generateErrorObject('unverified', 'email') });
                    return;
                }
                if (result) {
                    //expiresIn is being set in seconds
                    const jwtToken = jwt.sign({ username, email, id: _id }, process.env.JWT_KEY, { expiresIn: expirationTime });
                    // maxAge is being set in milliseconds
                    res.cookie('token', jwtToken, { maxAge: expirationTime * 1000, httpOnly: true }).json({ message: 'You are logged in', authenticated: true, username, email });
                } else {
                    res.status(400).json({ error: generateErrorObject('Wrong password', 'password') });
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

module.exports = authenticateUser;