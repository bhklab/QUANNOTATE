const authenticateUser = require('./authenticateUser');
const registerUser = require('./registerUser');
const checkToken = require('./checkToken');
const verifyUserEmail = require('./verifyUserEmail');
const logoutUser = require('./logoutUser');
const resendActivationLink = require('./resendActivationLink');

module.exports = {
    registerUser,
    authenticateUser,
    checkToken,
    logoutUser,
    verifyUserEmail,
    resendActivationLink
};