var express = require('express');
var fs = require('fs');
var app = express();
var transform = require(__dirname + '/lib/jpeg.js');
var delimg = require(__dirname + '/lib/delimg.js');
var port = process.env.PORT || 3000;
var usersRouter = require(__dirname + '/routes/users_routes.js');
var imagesRouter = require(__dirname + '/routes/images_routes.js');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/user_dev';
var mongoose = require('mongoose');
var htmlTemplate = require(__dirname + '/lib/html_template.js');
var customHTML = require(__dirname + '/lib/custom.js');
mongoose.connect(mongoURI);

app.use(express.static(__dirname + '/public'));

app.use('/api', imagesRouter);
app.use('/api', usersRouter);

app.get('/upload', function(req, res) {
	customHTML(res);
});

app.get('/original', function(req, res) {
	htmlTemplate(req, res, 'original.jpg');
});

app.get('/transformed', delimg, transform, function(req, res) {
	htmlTemplate(req, res, 'protan.jpg');
});

app.get('/compare', delimg, transform, function(req, res) {
	htmlTemplate(req, res, 'protan.jpg', '<img src="images/original.jpg" alt="original image">');
});

app.get('/*', function(req, res) {
	res.status(404).sendFile('404.html', {root: __dirname + '/public'});
});

app.listen(port, function() {
	console.log('The server is running on port: ' + port);
});

