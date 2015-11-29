var express = require('express');
var bodyParser = require('body-parser');
var Img = require(__dirname + '/../models/image');
var handleError = require(__dirname + '/../lib/handleErrors.js');
var eatAuth = require(__dirname + '/../lib/eat_auth.js');
var imagesRouter = module.exports = exports = express.Router();

imagesRouter.get('/images', function(req, res) {
	Img.find({}, function(err, data) {
		if (err) return handleError(err, res);
		res.json(data);
	});
});

imagesRouter.post('/images', bodyParser.json(), eatAuth, function(req, res) {
	process.env.IMAGEPATH = req.body.imagepath;
	console.log("image pagh!!!!", req.body.imagepath)
	var newImg = new Img(req.body);
	newImg.owner = req.user.username;
	newImg.save(function(err, data) {
		if (err) return handleError(err, res);
		res.json({msg: 'posted new image'});
	});
});

imagesRouter.put('/images/:imagepath', bodyParser.json(), eatAuth, function(req, res) {
	var imageData = req.body;
	delete imageData._id;
	Img.findOne({imagepath: req.params.imagepath}, function(err, data) {
		if (err) return handleError(err, res);
		if (data && data._doc.owner === req.user.username) {
			Img.update({imagepath: req.params.imagepath}, imageData, function(err, data) {
				if (err) handleError(err, res);
				res.json({msg: 'Image updated'});
			});
		} else {
			res.json({msg: 'no way!'});
		}
	});
});

imagesRouter.delete('/images/:imagepath', bodyParser.json(), eatAuth, function(req, res) {
	var imageData = req.body;
	delete imageData._id;
	Img.findOne({imagepath: req.params.imagepath}, function(err, data) {
		if (err) return handleError(err, res);
		if (data && data._doc.owner === req.user.username) {
			Img.remove({imagepath: req.params.imagepath}, function(err, data) {
				if (err) handleError(err, res);
				res.json({msg: 'Image deleted'});
			});
		} else {
			res.json({msg: 'no way!'});
		}
	});
});
