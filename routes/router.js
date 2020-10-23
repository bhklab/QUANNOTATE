const express = require('express');
const router = express.Router();
const { registerUser } = require('./user');

// user routes
router.post('/user/register', registerUser);

module.exports = router;