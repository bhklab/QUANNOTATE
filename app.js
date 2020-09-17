require('dotenv').config();

// const join = require('path').join;
const express = require('express');
const db = require('./database/mongoose');
// const models = join(__dirname, 'app/models');

const port = process.env.PORT || 5000;
const app = express();
require('./config/express')(app);

db.connection
	.on('error', console.log)
	.on('disconnected', db.connect)
	.once('open', listen);

function listen() {
	app.listen(port);
	console.log('Express app started on port ' + port);
}

/**
 * Expose
 */
module.exports = app;