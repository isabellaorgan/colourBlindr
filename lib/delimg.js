var fs = require('fs');

module.exports = exports = function(req, res, next) {
	fs.readFile(__dirname + '/../public/images/protan.jpg', function(err, data) {
		if (err) {
			console.log(' that image was not found. Thus nothing to delete. So on to the next step.');
			return next();
		}
		fs.unlink(__dirname + '/../public/images/protan.jpg', next());
	});
};
