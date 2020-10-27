const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser, checkToken } = require('./user');

// user routes
router.get('/user/checkToken', checkToken);
router.post('/user/authenticate', authenticateUser);
router.post('/user/register', registerUser);

module.exports = router;