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
mongoose.connect(mongoURI);

app.use(express.static(__dirname + '/public'));

app.use('/api', imagesRouter);
app.use('/api', usersRouter);

app.get('/upload', function(req, res) {
	res.status(200).sendFile('upload.html', {root: __dirname + '/public'});
});

app.get('/original', function(req, res) {
	var body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset=UTF-8" + />' +
  '</head>' +
  '<body>' +
  '<img src="images/original.jpg" alt="original image">' +
  '</body>' +
  '</html>';
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(body);
	res.end();
});

app.get('/transformed', delimg, transform, function(req, res) {
	var something = 'protan.jpg';
	var body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset=UTF-8" + />' +
  '</head>' +
  '<body>' +
  '<img src="images/' + something + '" alt="protan image">' +
  '</body>' +
  '</html>';
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(body);
	res.end();
});

app.get('/compare', delimg, transform, function(req, res) {
  var something = 'protan.jpg';
  var body = '<html>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset=UTF-8" + />' +
  '</head>' +
  '<body>' +
  '<img src="images/original.jpg" alt="original image">' +
  '<img src="images/' + something + '" alt="protan image">' +
  '</body>' +
  '</html>';
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(body);
	res.end();
});

app.get('/*', function(req, res) {
	res.status(404).sendFile('404.html', {root: __dirname + '/public'});
});

app.listen(port, function() {
	console.log('The server is running on port: ' + port);
});

