const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// dataset schema
const patientSchema = new Schema({
    patient: {
        type: String,
        required: true,
    },
    dataset_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dataset',
        required: true,
    },
    labels: {
        type: [{
            user: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            analysis: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Analysis',
                required: true
            },
            values: { type: Array, default: [] }
        }]
    }
});

// creates and exports subset model
module.exports = mongoose.model('Patient', patientSchema);