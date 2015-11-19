var express = require('express');
var bodyParser = require('body-parser');
var Img = require(__dirname + '/../models/image');
var handleError = require(__dirname + '/../lib/handleErrors.js');

var imagesRouter = module.exports = exports = express.Router();

imagesRouter.get('/images', function(req, res) {
	Img.find({}, function(err, data) {
		if (err) return handleError(err, res);

		res.json(data);
	});
});

imagesRouter.post('/images', bodyParser.json(), function(req, res) {
	var newImg = new Img(req.body);
	newImg.save(function(err, data) {
		if (err) return handleError(err, res);

		res.json(data);
	});
});

imagesRouter.put('/images/:id', bodyParser.json(), function(req, res) {
	var imageData = req.body;
	delete imageData._id;
	Img.update({_id: req.params.id}, imageData, function(err, data) {
		if (err) handleError(err, res);

		res.json({msg: 'Image updated'});
	});
});

imagesRouter.delete('/images/:id', function(req, res) {
	Img.remove({_id: req.params.id}, function(err) {
		if (err) return handleError(err, res);

		res.json({msg: 'Image removed'});
	});
});
