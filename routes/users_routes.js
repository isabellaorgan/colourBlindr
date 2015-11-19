var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleErrors.js');

var usersRouter = module.exports = exports = express.Router();

usersRouter.use(express.static(__dirname + '/public'));

usersRouter.get('/users', function(req, res) {
	User.find({}, function(err, data) {
		if (err) return handleError(err, res);

		res.json(data);
	});
});

usersRouter.post('/users', bodyParser.json(), function(req, res) {
	// User.findOne({'username': req.body.username}, function(err, data) {
	// 	if (err) return handleError(err, res);
	// 	if (data && data.username === req.body.username) {
	// 		return console.log('THAT USER IS ALREADY IN THE DATABASE');
	// 	}
		var newUser = new User(req.body);
		newUser.save(function(err, data) {
			if (err) return handleError(err, res);

			res.json(data);
		});
	//});
});

usersRouter.put('/users/:id', bodyParser.json(), function(req, res) {
	var userData = req.body;
	delete userData._id;
	User.update({_id: req.params.id}, userData, function(err, data) {
		if (err) handleError(err, res);

		res.json({msg: 'User updated'});
	});
});

usersRouter.delete('/users/:id', function(req, res) {
	User.remove({_id: req.params.id}, function(err) {
		if (err) return handleError(err, res);

		res.json({msg: 'User removed'});
	});
});

usersRouter.get('/users/:username', function(req, res) {
	User.findOne({'username': req.params.username}, function(err, data) {
		if (err) return handleError(err, res);
		if (!data) return res.status(404).sendFile('404.html', {root: __dirname + '/../public'});
		var body = '<html>' +

		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; ' +
		'charset=UTF-8" + />' +
		'</head>' +
		'<body>' +
		'<p> Hi my name is ' + data.username + '!  I can put other info here too! For example: my visontype is: ' + data.visiontype + '.</p>' +
		'</body>' +
		'</html>';

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(body);
		res.end();

	});
});
