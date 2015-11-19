var fs = require('fs');

module.exports = exports = function(req, res, next) {
	fs.readFile(__dirname + '/../public/images/protan.jpg', function(err, data) {
		if (err) {
			console.log('not found!!!');
			return next();
		}
		fs.unlink(__dirname + '/../public/images/protan.jpg', next());
	});
};
