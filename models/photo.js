var mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
  imgName: String,
  imgData: String

	// imgname: {type: String,
	// altered: {type: Boolean, default: 'false'},
	// caption: {type: String, default: 'photo description'}
	// }
});

module.exports = mongoose.model('Photo', photoSchema);

