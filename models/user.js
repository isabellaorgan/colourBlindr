var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String
		// basic: {
		// 	username: String,
		// 	password: String
		// },
		// colorblndtype: {type: String, default: 'deuteranopia'}
});

module.exports = mongoose.model('User', userSchema);
