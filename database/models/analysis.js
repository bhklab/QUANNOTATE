const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema
const analysisSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    available: {
        type: Boolean,
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [{
            text: { type: String, required: true, trim: true },
            dataType: { type: String, required: true, trim: true },
        }]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// creates and exports subset model
module.exports = mongoose.model('Analysis', analysisSchema);