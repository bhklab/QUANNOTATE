const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser } = require('./user');

// user routes
router.post('/user/authenticate', authenticateUser);
router.post('/user/register', registerUser);

module.exports = router;