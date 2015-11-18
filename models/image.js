var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
	imagename: {type: String,
	altered: {type: Boolean, default: 'false'},
	caption: {type: String, default: 'image description'}
	}
});

module.exports = mongoose.model('Image', imageSchema);

