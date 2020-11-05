require('dotenv').config();
const seeder = require('mongoose-seed');
// importing data
const data = require('../data-files/analysis.json');

console.log(process.env.MONGODB_URL);
// Connect to MongoDB via Mongoose
seeder.connect(process.env.MONGODB_URL, function () {
    // Load Mongoose models
    seeder.loadModels([
        'database/models/analysis.js'
    ]);
    // Clear specified collections
    seeder.clearModels(['Analysis'], function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function (err, done) {
            if (err) {
                console.log('Seed error', err);
            }
            if (done) {
                console.log('Seeding is done', done);
            }
            seeder.disconnect();
        });
    });
});