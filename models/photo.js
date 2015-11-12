var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
	imgname: {type: String,
	colorprofile: {type: String, default: 'red'},
	caption: {type: String, default: 'photo description'}
	}
});

module.exports = mongoose.model('Photo', photoSchema);