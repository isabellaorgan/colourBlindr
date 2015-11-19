module.exports = exports = function(req, res, next) {
	var rgbToHex = require(__dirname + '/algo').rgbToHex;
	var componentToHex = require(__dirname + '/algo').componentToHex;
	var protan = require(__dirname + '/algo').protan;
	var Jimp = require('patci-jimp');

	Jimp.read('public/images/original.jpg', function(err, img) {
		if (err) throw err;
		img.protan()
		.write(__dirname + '/../public/images/protan.jpg');

		next();
	});

};
