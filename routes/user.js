const jwt = require('jsonwebtoken');
const { User } = require('../database/models/index');
const generateErrorObject = require('../utils/generateErrorObject');
const nodemailer = require('nodemailer');
const emailId = process.env.EMAIL_ID;
const emailPassword = process.env.EMAIL_ID;


/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: emailId,
        pass: emailPassword
    }
});
let rand;

// sets expiration time for jwt tokens and cookies
const expirationTime = 60 * 60; // 1 hour

function authenticateUser(req, res) {
    try {
        const { user } = req.body;
        if (!user) {
            res.status(400).json({ error: generateErrorObject('User information is missing', 'generic') });
        }
        const { password, email } = user;
        if (!password || !email) {
            res.status(400).json({ error: generateErrorObject('Some fields are missing', 'generic') });
        }
        // finds user by email address
        User.findOne({ email }).then((user) => {
            if (!user) {
                res.status(400).json({ error: generateErrorObject('There is no user with this email address', 'email')});
                return;
            }
            const { username, _id } = user;
            // check if user provided correct provided
            user.isPasswordMatch(password).then(result => {
                if (result) {
                    //expiresIn is being set in seconds
                    const jwtToken = jwt.sign({ username, email, id: _id }, process.env.JWT_KEY, { expiresIn: expirationTime });
                    // maxAge is being set in milliseconds
                    res.cookie('token', jwtToken, { maxAge: expirationTime * 1000, httpOnly: true }).json({ message: 'You are logged in', authenticated: true, username, email });
                } else {
                    res.status(400).json({ error: generateErrorObject('Wrong password', 'password')});
                }
            }).catch(err => {
                console.log('Error while comparing hash and password', err);
                res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
            });
        });
    } catch (error) {
        console.log('Error during authentication');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

function registerUser(req, res) {
    try {
        const { user } = req.body;
        if (!user) {
            res.status(400).json({ error: generateErrorObject('User information is missing', 'generic') });
        }
        const { username, password, email } = user;
        if (!username || !password || !email) {
            res.status(400).json({ error: generateErrorObject('Some fields are missing', 'generic') });
        }
        // checks if user with this email address was already created
        User.findOne({email}).then((user) => {
            if (user) {
                const message = 'User with this email is already registered';
                return res.status(400).json({ error: generateErrorObject(message, 'email') });
            } else {
                const newUser = new User({
                    username,
                    email,
                    password,
                    verified: false
                });
                // attempts to save new user
                newUser.save(function (err, savedUser) {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ error: err });
                        return;
                    }
                    const id = savedUser._id;
                    //expiresIn is being set in seconds
                    const jwtToken = jwt.sign({ username, email, id }, process.env.JWT_KEY, { expiresIn: expirationTime });
                    // maxAge is being set in milliseconds
                    rand = Math.floor((Math.random() * 100) + 54);
                    const host = req.get('host');
                    const link = 'http://' + host + '/verify?id=' + rand;

                    const mailOptions = {
                        to: 'email@gmail.com',
                        subject: 'Please confirm your Email account',
                        html: 'Hello,<br> Please Click on the link to verify your email.<br><a href=' + link + '>Click here to verify</a>'
                    };

                    console.log(mailOptions);
                    smtpTransport.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                            res.end('error');
                        } else {
                            console.log('Message sent: ' + response.message);
                            res.end('sent');
                        }
                    });

                    res.cookie('token', jwtToken, { maxAge: expirationTime * 1000, httpOnly: true }).json({ message: 'User saved', authenticated: true, username, email });
                });
            }
        });
    } catch (error) {
        console.log('Error during registration');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

function checkToken(req, res) {
    try {
        const { cookies } = req;
        if (!cookies || !cookies.token) {
            res.status(200).json({ message: 'User is not logged in', authenticated: false, });
        } else {
            jwt.verify(cookies.token, process.env.JWT_KEY, function (err, decoded) {
                if (err) {
                    res.status(400).json({ authenticated: false, error: generateErrorObject('token couldn\'t be verified' , 'generic') });
                } else {
                    const { username, email } = decoded;
                    res.status(200).json({ authenticated: true, username, email, message: 'User is logged in'});
                }
            });
        }
    } catch (error) {
        console.log('Error during token verification');
        console.log(error);
        res.status(500).json({ error: generateErrorObject('Something went wrong', 'generic') });
    }
}

function logoutUser(req, res) {
    res.cookie('token', '', { expires: new Date() }).status(200).json({message: 'User successfully logged out'});
}

function verifyUserEmail(req, res) {
    console.log(req);
    console.log('Here');
    res.status(200).send('OK');
}

module.exports = {
    registerUser,
    authenticateUser,
    checkToken,
    logoutUser,
    verifyUserEmail
};