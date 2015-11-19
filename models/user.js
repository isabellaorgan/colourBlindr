var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	visiontype: {type: String, default: 'deuteranopia'}
});

module.exports = mongoose.model('User', userSchema);
