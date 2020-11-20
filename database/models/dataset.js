const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// dataset schema
const datasetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// creates and exports subset model
module.exports = mongoose.model('Dataset', datasetSchema);