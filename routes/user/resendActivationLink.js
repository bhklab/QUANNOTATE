const { User } = require('../../database/models/index');
const generateErrorObject = require('../../utils/generateErrorObject');
const { sendVerificationEmail } = require('../../mailer/mailer');

async function resendActivationLink(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: generateErrorObject('User email is missing', 'generic') });
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: generateErrorObject('There is no user with this email address', 'email') });
            return;
        }
        const { urlString, _id, username } = user;
        // calls a mailer function
        await sendVerificationEmail(req, _id, urlString, email);
        res.status(200).json({ message: `Email was sent to ${email}. Please verify your account.`, username, email, id: _id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

module.exports = resendActivationLink;