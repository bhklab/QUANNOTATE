const { User } = require('../../database/models/index');
const generateErrorObject = require('../../utils/generateErrorObject');

async function verifyUserEmail(req, res) {
    const { token, user } = req.query;
    if (!token || !user) {
        res.status(401).json({ error: generateErrorObject('Token or user query parameter is missing in the query', 'generic') });
        return;
    }
    try {
        const userToVerify = await User.findOne({ _id: user });
        console.log(userToVerify);
        if (!userToVerify) {
            res.redirect('/notification/error/no-user');
            return;
        }
        if (userToVerify.urlString === token) {
            // removing hash string field
            userToVerify.urlString = undefined;
            userToVerify.verified = true;
            await userToVerify.save();
            res.redirect('/notification/verified');
        } else {
            // user tries to use verification link after his account was verified and there is no verification link
            res.redirect('/notification/error/expired');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

module.exports = verifyUserEmail;