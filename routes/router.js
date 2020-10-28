const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser, checkToken, logoutUser } = require('./user');

// user routes
router.get('/user/checkToken', checkToken);
router.get('/user/logout', logoutUser);
router.post('/user/authenticate', authenticateUser);
router.post('/user/register', registerUser);

module.exports = router;