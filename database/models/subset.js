const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema
const subsetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    options: {
        type: [{
            name: { type: String, required: true, trim: true },
            dataType: { type: String, required: true, trim: true },
            text: { type: String, required: true, trim: true }
        }]
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// creates and exports subset model
module.exports = mongoose.model('Subset', subsetSchema);