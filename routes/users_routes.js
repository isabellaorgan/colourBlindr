var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleErrors.js');

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

///////// this saves a base64-encoded string of the photo data in our database upon a POST requuest. You need to post '{"imgName":"whatevernameyouwant","imgData":"thisstringcanbeanythingnbecauseitwillbeoverwrittenanyway"}' . the data will be converetd to an actual image upon a subsequent GET request to /api/photo/:imgName
var Photo = require(__dirname + '/../models/photo');
var fs = require('fs');
var buf1 = fs.readFileSync(__dirname + '/../img_data/normal_colour.png');
var string64 = buf1.toString('base64');

usersRouter.post('/photo', bodyParser.json(), function(req, res) {
	req.body.imgData = string64;
	var newPhoto = new Photo(req.body);

	newPhoto.save(function(err, data) {
		if (err) return handleError(err, res);

		res.json("data has been saved in the database");
	});
});

///// ok now you get to CREATE the photo image upon a get request: The file is not saved until after you make the get request and the string data for image is pulled from the db

usersRouter.get('/photo/:imgName', function(req, res) {
	Photo.find({imgName: req.params.imgName}, function(err, data) {
		if (err) return handleError(err, res);
		var newBuf = new Buffer(data[0].imgData, 'base64');

		fs.writeFileSync(__dirname + '/../img_data/photo999.png', newBuf);
		res.send(data)

	});
});
