function logoutUser(req, res) {
    res.cookie('token', '', { expires: new Date() }).status(200).json({ message: 'User successfully logged out' });
}

module.exports = logoutUser;