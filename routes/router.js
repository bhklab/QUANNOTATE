const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser, checkToken, logoutUser } = require('./user');
const { getImages, getAnalysisSummary } = require('./analysis');

// user routes
router.get('/user/checkToken', checkToken);
router.get('/user/logout', logoutUser);
router.post('/user/authenticate', authenticateUser);
router.post('/user/register', registerUser);

// analysis routes
router.get('/analysis/summary', getAnalysisSummary);
router.get('/analysis/getImages', getImages);

module.exports = router;