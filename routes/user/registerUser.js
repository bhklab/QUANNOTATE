const cryptoRandomString = require('crypto-random-string');
const { User } = require('../../database/models/index');
const generateErrorObject = require('../../utils/generateErrorObject');
const { sendVerificationEmail } = require('../../mailer/mailer');

function registerUser(req, res) {
    try {
        const { user } = req.body;
        if (!user) {
            res.status(400).json({ error: generateErrorObject('User information is missing', 'generic') });
            return;
        }
        const { username, password, email } = user;
        if (!username || !password || !email) {
            res.status(400).json({ error: generateErrorObject('Some fields are missing', 'generic') });
            return;
        }
        // checks if user with this email address was already created
        User.findOne({ email }).then((user) => {
            if (user) {
                const message = 'User with this email is already registered';
                res.status(400).json({ error: generateErrorObject(message, 'email') });
                return;
            } else {
                // creates random string
                const newUser = new User({
                    username,
                    email,
                    password,
                    verified: false,
                    urlString: cryptoRandomString({ length: 128, type: 'url-safe' })
                });
                // attempts to save new user
                newUser.save(async function (err, savedUser) {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ error: err });
                        return;
                    }
                    try {
                        const { urlString, _id, username, email } = savedUser;
                        await sendVerificationEmail(req, _id, urlString, email);
                        res.status(200).json({ message: `Email was sent to ${email}. Please verify your account.`, username, email, id: _id });
                    } catch (error) {
                        console.log(error);
                        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
                    }
                });
            }
        });
    } catch (error) {
        console.log('Error during registration');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

module.exports = registerUser;
