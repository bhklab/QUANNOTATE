
const jwt = require('jsonwebtoken');
const generateErrorObject = require('../../utils/generateErrorObject');

function checkToken(req, res) {
    try {
        const { cookies } = req;
        if (!cookies || !cookies.token) {
            res.status(200).json({ message: 'User is not logged in', authenticated: false, });
        } else {
            jwt.verify(cookies.token, process.env.JWT_KEY, function (err, decoded) {
                if (err) {
                    res.status(400).json({ authenticated: false, error: generateErrorObject('token couldn\'t be verified', 'generic') });
                } else {
                    const { username, email } = decoded;
                    res.status(200).json({ authenticated: true, username, email, message: 'User is logged in' });
                }
            });
        }
    } catch (error) {
        console.log('Error during token verification');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

module.exports = checkToken;
