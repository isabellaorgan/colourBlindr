var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	imagePath: String,
	altered: {type: Boolean, default: 'false'},
	owner: {type: String, default: 'anonymous'}

});

module.exports = mongoose.model('Image', imageSchema);

