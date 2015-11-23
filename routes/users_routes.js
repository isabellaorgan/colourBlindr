var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handleErrors.js');
var httpBasic = require(__dirname + '/../lib/http_basic.js');
var usersRouter = module.exports = exports = express.Router();
var eatAuth = require(__dirname + '/../lib/eat_auth.js');
var EE = require('events').EventEmitter;
var postEmitter = new EE();
var getEmitter = new EE();

usersRouter.use(express.static(__dirname + '/public'));

usersRouter.get('/users', function(req, res) {
	User.find({}, function(err, data) {
		if (err) return handleError(err, res);

		res.json(data);
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

usersRouter.post('/signup', bodyParser.json(), function(req, res) {
  User.find({'username': req.body.username}, function(err, data) {
    if (err) return handleError(err, res);
    if (data[0] && data[0].basic.username === req.body.username) {
      console.log('THAT USER IS ALREADY IN THE DATABASE'); // prevent newUser emission if the username is already in the db. NOTHING FURTHER SHOULD HAPPEN WITH THIS REQUEST.
      return res.json({msg: "that user is already in the database"});
    }
    postEmitter.emit('newUser', req, res); //only if user not in db aleady
  });
});

postEmitter.on('newUser', function(req, res) {
  process.env.USERNAME = req.body.username;
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  postEmitter.emit('one', newUser, req, res);
});

postEmitter.on('one', function(newUser, req, res) {
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError(err, res);
    postEmitter.emit('two', newUser, req, res);
  });
});

postEmitter.on('two', function(newUser, req, res) {
  newUser.save(function(err, data) {// data is NOT just the hash! it is an object with username, basic.username, basic.password (now hashed not plaintext), and the _id: property given to it by mongo during the .save
    if (err) return handleError(err, res);
    postEmitter.emit('three', newUser, req, res);
  });
});

postEmitter.on('three', function(newUser, req, res) {
  newUser.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  //does this user exist in the database?
  getEmitter.emit('one', req, res);
});

getEmitter.on('one', function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err,res);

    if (!user) {
      console.log('Could not authenticate the following user: ' + req.auth.username);
      return res.status(401).json({msg: 'Could not authenticate. Maybe you the wrong user name?'});
    }
    getEmitter.emit('two', req, res, user);
  });
});

getEmitter.on('two', function(req, res, user) {
  user.compareHash(req.auth.password, function(err, comparrison) {
    // this is really just bcrypt.compare() so comparrison is from bcrypt and is either "true" or "false" - did the password input match the data decrypted from the hash?
    if (err) handleError(err, res);
    if (comparrison === false) {
      console.log('Could not authinticate: ' + req.auth.username);
      return res.status(401).json({msg: 'Nope!'});
    }
    getEmitter.emit('three', req, res, user);
  });
});

getEmitter.on('three', function(req, res, user) {
  user.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});




usersRouter.put('/users/:username', bodyParser.json(), eatAuth, function(req, res) {
  var userData = req.body;
  delete userData._id;
  User.findOne({username: req.params.username}, function(err, data){
    if (err) return handleError(err, res);
    if (data && data._doc.username === req.user.basic.username){
      User.update({username: req.params.username}, userData, function(err, data) {
        if (err) handleError(err, res);
        res.json({msg: 'User updated'});
      });
    } else {
    res.json({msg: 'no way!'});
    }
  });
});

usersRouter.delete('/users/:username', bodyParser.json(), eatAuth, function(req, res) {
  User.findOne({username: req.params.username}, function(err, data){
    if (err) return handleError(err, res);
    if (data && data._doc.username === req.user.basic.username){
      User.remove({username: req.params.username}, function(err) {
        if (err) return handleError(err, res);
        res.json({msg: 'User removed'});
      });
    } else {
    res.json({msg: "no way!"});
    }
  });
});
