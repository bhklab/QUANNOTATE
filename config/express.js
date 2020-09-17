const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('../routes/router.js');

// global settings for app
module.exports = function (app) {
    app.use(bodyParser.json());
    // Enables CORS
    app.use(cors());
    // this will set/use our api to initial path of /api.
    app.use('/api', router);
};