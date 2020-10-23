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
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Invalid email'
        }
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
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// creates and exports user model
module.exports = mongoose.model('User', userSchema);