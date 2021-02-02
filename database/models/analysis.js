const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// analysis schema
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
    dataset: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dataset',
        required: true,
    },
    group: {
        type: Boolean,
        required: false
    },
    groupTitle: {
        type: String,
        required: false
    },
    subgroups: {
        type: [{
            type: String, required: true,
        }],
        required: false
    },
    windowing: {
        type: Boolean,
        required: true,
    },
    windowingOptions: {
        type: [{
            label: { type: String, required: true },
            value: { type: String, required: true }
        }]
    },
    options: {
        type: [{
            id: { type: String, required: true, trim: true },
            text: { type: String, required: true, trim: true },
            dataType: { type: String, enum: ['checkbox', 'dropdown', 'text'], required: true, trim: true },
            options: { type: Array, required: false }
        }],
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// creates and exports subset model
module.exports = mongoose.model('Analysis', analysisSchema);