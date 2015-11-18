var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	vision_type: {type: String, default: 'deuteranopia'}
});

module.exports = mongoose.model('User', userSchema);
