const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [{
            validator: (value) => validator.isEmail(value),
            message: 'Invalid email'
        },
        {
            validator: (value) => value.match(/uhn\.ca$/) || value.match(/uhnresearch\.ca$/),
            message: 'Only uhn.ca and uhnresearch.ca emails are allowed'
        }
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: [
            {
                validator: (value) => {
                    return value.length >= 8;
                },
                message: 'Password has to be at least 8 characters long'
            },
            {
                validator: (value) => {
                    return value.match(/\d/) && value.match(/[a-zA-Z]/);
                },
                message: 'Password must contain at least one letter and one number'
            },
        ],
    },
    // field that shows whether user account was verified
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    // used to verify user account
    urlString: {
        type: String
    }

},
{
    timestamps: true,
});

//  Check if password matches the user's password
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

// hashes password with bcryptjs
userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        // generates salt (a random value that is used in hashing function and
        // prevents database rainbow table attacks)
        // it is recommended to have it at least 12
        // ideally hashing process should take ~ 250 milliseconds, the number of rounds should be based on that
        const salt = bcrypt.genSaltSync(12);
        user.password = bcrypt.hashSync(user.password, salt);
    }
    next();
});

// creates and exports user model
module.exports = mongoose.model('User', userSchema);