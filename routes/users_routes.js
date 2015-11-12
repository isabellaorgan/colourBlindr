var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');

var usersRouter = module.exports = exports = express.Router();

usersRouter.get('/users', function(req, res) {
	User.find({}, function(err, data) {
		if (err) return handleError(err, res);

		res.json(data);
	});
});

usersRouter.post('/users', bodyParser.json(), function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err, data) {
		if (err) return handleError(err, res);

		res.json(data);
	});
});

usersRouter.put('/users/:id', bodyParser.json(), function(req, res) {
	var userData = req.body;
	delete UserData._id;
	User.update({_id: req.params.id}, userData, function(err, data) {
		if (err) handleError(err, res);

		res.json({msg: 'User added'});
	});
});

usersRouter.delete('/users:id', function(req, res) {
	User.remove({id: req.params.id}, function(err) {
		if (err) return handleError(err, res);

		res.json({msg: 'User removed'});
	});
});





