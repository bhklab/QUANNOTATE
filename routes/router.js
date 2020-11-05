const express = require('express');
const router = express.Router();
const { registerUser, authenticateUser, checkToken, logoutUser } = require('./user');
const { getImages, getAnalysisSummary } = require('./analysis');
const { requireAuthentication } = require('./middleware');

// user routes
router.get('/user/checkToken', checkToken);
router.get('/user/logout', logoutUser);
router.post('/user/authenticate', authenticateUser);
router.post('/user/register', registerUser);

// analysis routes (all routes are private)
router.get('/analysis/summary', requireAuthentication, getAnalysisSummary);
router.get('/analysis/getImages', requireAuthentication, getImages);

module.exports = router;