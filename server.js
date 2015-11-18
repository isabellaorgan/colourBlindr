var express = require('express');
var app = express();
var transform = require(__dirname + '/lib/jpeg.js');


var port = process.env.PORT || 3000;
var usersRouter = require(__dirname + '/routes/users_routes.js');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/user_dev';
var mongoose = require('mongoose');
mongoose.connect(mongoURI);

app.use(express.static(__dirname + '/public'));


app.use('/api', usersRouter);

app.get('/', function(req, res) {
  res.send('howdy')
})

// app.get('/', function(req, res) {
// res.send('This is Colo(u)Blindr up and running');
// });


app.get('/protan', transform, function(req, res) {
  res.status(200).sendFile('index.html', {root: __dirname + "/public"});
});


app.listen(port, function(){
  console.log("The server is running on port: " + port);
});

