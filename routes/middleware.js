const jwt = require('jsonwebtoken');

function requireAuthentication(req, res, next) {
    const { cookies } = req;
    if (!cookies || !cookies.token) {
        res.status(400).json({ error: 'User is not authenticated' });
    } else {
        jwt.verify(cookies.token, process.env.JWT_KEY, function (err) {
            if (err) {
                res.status(400).json({ error: 'User is not authenticated' });
            } else {
                next();
            }
        });
    }
}

module.exports = {
    requireAuthentication
};