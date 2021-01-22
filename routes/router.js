const express = require('express');
const router = express.Router();
const passport = require('passport');
const { registerUser, authenticateUser, checkToken, logoutUser } = require('./user');
const { 
    getLabelImages,
    getAnalysisSummary,
    getAnalysisInfo,
    getPatient,
    registerLabels
} = require('./analysis');
const { requireAuthentication } = require('./middleware');
require('../auth/auth');

// user routes
router.get('/user/checkToken', checkToken);
router.get('/user/logout', logoutUser);
router.post('/user/authenticate', authenticateUser);
router.post('/user/register', registerUser);

// analysis routes (all routes are private)
router.get('/analysis', requireAuthentication, getAnalysisSummary);
router.get('/analysis/patient', requireAuthentication, getPatient);
router.post('/analysis/patient', passport.authenticate('jwt', { session: false }), registerLabels);
router.get('/analysis/:type/', requireAuthentication, getAnalysisInfo);
router.get('/analysis/:type/images', requireAuthentication, getLabelImages);

module.exports = router;