const express = require('express');
const router = express.Router();
const passport = require('passport');
const { 
    registerUser,
    authenticateUser,
    checkToken,
    logoutUser,
    verifyUserEmail
} = require('./user');
const { 
    getLabelImages,
    getAnalysisSummary,
    getAnalysisInfo,
    getPatient,
    registerLabels
} = require('./analysis');
require('../auth/auth');

// user routes
router.get('/user/checkToken', checkToken);
router.get('/user/logout', logoutUser);
router.get('/user/verify/:token', verifyUserEmail);
router.post('/user/authenticate', authenticateUser);
router.post('/user/register', registerUser);

// analysis routes (all routes are private)
router.get('/analysis', passport.authenticate('jwt', { session: false }), getAnalysisSummary);
router.get('/analysis/patient', passport.authenticate('jwt', { session: false }), getPatient);
router.post('/analysis/patient', passport.authenticate('jwt', { session: false }), registerLabels);
router.get('/analysis/:type/', passport.authenticate('jwt', { session: false }), getAnalysisInfo);
router.get('/analysis/:type/images', passport.authenticate('jwt', { session: false }), getLabelImages);

module.exports = router;