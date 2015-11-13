var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var usersRouter = require(__dirname + '/routes/users_routes.js');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/user_dev';
var mongoose = require('mongoose');
mongoose.connect(mongoURI);

app.use('/api', usersRouter);

app.listen(port, function(){
  console.log("The server is running on port: " + port);
});

