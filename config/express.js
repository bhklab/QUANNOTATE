const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('../routes/router.js');
const express = require('express');
const join = require('path').join;
const cookieParser = require('cookie-parser');


// global settings for app
module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(cookieParser());
    // Enables CORS
    app.use(cors({ credentials: true }));
    app.use(express.static(join(__dirname, '../client/build')));
    // this will set/use our api to initial path of /api.
    app.use('/api', router);
    // renders react files if request doesn't go to the api
    app.get('/*', (req, res) => {
        res.sendFile('index.html', { root: './client/build' });
    });
};