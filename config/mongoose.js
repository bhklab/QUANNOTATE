const mongoose = require('mongoose');
const connection = connect();

function connect() {
	var options = { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true };
	mongoose.connect(process.env.MONGODB_URL, options);
	return mongoose.connection;
}


module.exports = {
	connect,
	connection
};