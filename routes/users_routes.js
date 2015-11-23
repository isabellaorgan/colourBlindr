var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user.js');
var Img = require(__dirname + '/../models/image.js');
var handleError = require(__dirname + '/../lib/handleErrors.js');
var httpBasic = require(__dirname + '/../lib/http_basic.js');
var usersRouter = module.exports = exports = express.Router();
var eatAuth = require(__dirname + '/../lib/eat_auth.js');
var EE = require('events').EventEmitter;
var postEmitter = new EE();
var getEmitter = new EE();
var putEmitter = new EE();
var deleteEmitter = new EE();

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

///// POST
usersRouter.post('/signup', bodyParser.json(), function(req, res) {
  User.findOne({'username': req.body.username}, function(err, data) {
    if (err) return handleError(err, res);
    if (data && data.username === req.body.username) {
      console.log('THAT USER IS ALREADY IN THE DATABASE'); // prevent newUser emission if the username is already in the db. NOTHING FURTHER SHOULD HAPPEN WITH THIS REQUEST.
      return res.json({msg: "that user is already in the database"});
    }
    postEmitter.emit('newUser', req, res); //only if user not in db aleady
  });
});

postEmitter.on('newUser', function(req, res) {
  process.env.USERNAME = req.body.username;
  var newUser = new User();
  newUser.username = req.body.username;
  postEmitter.emit('createHash', newUser, req, res);
});

postEmitter.on('createHash', function(newUser, req, res) {
  newUser.generateHash(req.body.password, function(err, hash) {
    if (err) return handleError(err, res);
    postEmitter.emit('save', newUser, req, res);
  });
});

postEmitter.on('save', function(newUser, req, res) {
  newUser.save(function(err, data) {
    if (err) return handleError(err, res);
    postEmitter.emit('makeToken', newUser, req, res);
  });
});

postEmitter.on('makeToken', function(newUser, req, res) {
  newUser.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});

//////// GET
usersRouter.get('/signin', httpBasic, function(req, res) {
  //does this user exist in the database?
  getEmitter.emit('returningUser', req, res);
});

getEmitter.on('returningUser', function(req, res) {
  User.findOne({username: req.auth.username}, function(err, user) {
    if (err) return handleError(err,res);

    if (!user) {
      console.log('Could not authenticate the following user: ' + req.auth.username);
      return res.status(401).json({msg: 'Could not authenticate. Maybe you the wrong user name?'});
    }
    getEmitter.emit('verifyHash', req, res, user);
  });
});

getEmitter.on('verifyHash', function(req, res, user) {
  user.compareHash(req.auth.password, function(err, comparrison) {
    // this is really just bcrypt.compare() so comparrison is from bcrypt and is either "true" or "false" - did the password input match the data decrypted from the hash?
    if (err) handleError(err, res);
    if (comparrison === false) {
      console.log('Could not authinticate: ' + req.auth.username);
      return res.status(401).json({msg: 'Nope!'});
    }
    getEmitter.emit('getToken', req, res, user);
  });
});

getEmitter.on('getToken', function(req, res, user) {
  user.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});

//// PUT//////
usersRouter.put('/users/:username', bodyParser.json(), eatAuth, function(req, res) {
	var userData = req.body;

	if (req.body.password) { // if password is being changed
		return res.json({msg: "sorry, password changing feature has not been implemented yet"}
		);// no password changing feature yet
	}
  delete userData._id;
  putEmitter.emit('checkIfSameUser', userData, req, res);
});

putEmitter.on('checkIfSameUser', function(userData, req, res) {
  User.findOne({username : req.params.username}, function(err, data1){
    if (err) return handleError(err, res);
    if (data1 && data1._doc.username === req.user.username){ // if the user to be changed is also the user who is logged in ( so you can only edit your own user)
    	if (req.body.username) { // check if username is being changed
    		putEmitter.emit('verifyUniqueUser', userData, req, res, data1);
    	} else {
    		putEmitter.emit('updateUser-notUsername', userData, req, res, data1); // if not changing username, then go ahead and update
    	}
  	} else {
  		res.json({msg: 'you are not authorized to change this user'}) // if user to be edited does not match the person loggind in who is trying to perform edits
  	}
  });
});

putEmitter.on('verifyUniqueUser', function(userData, req, res, data1) { // if the username is to be changed, the new name must be unique
	User.findOne({username: req.body.username}, function(err, data2) {
    if (err) return handleError(err, res);
    if (data2 && data2.username === req.body.username) {
      console.log('THAT USER IS ALREADY IN THE DATABASE');
    	res.json({msg: 'that user is already in the database'});
    } else {// if unique username then proceed
      putEmitter.emit('updateUsernameAndImgOwner', userData, req, res, data1, data2)
    }
  });
});

putEmitter.on('updateUser-notUsername', function(userData, req, res, data1, data2) {
 	User.update({username: req.params.username}, userData, function(err, data3) {
    if (err) handleError(err, res);
    res.json({msg: 'User updated'});
  });
});

//if username changes, then ownership of images needs to match new name
putEmitter.on('updateUsernameAndImgOwner', function(userData, req, res, data1, data2) {
    User.update({username: req.params.username}, userData, function(err, data3) {
    if (err) handleError(err, res);
    // res.json({msg: 'User updated'});
  });
  var imgOwnerData = {"owner": req.body.username}
  Img.update({owner: req.params.username}, imgOwnerData, function(err, data3) {
    if (err) handleError(err, res);
    res.json({msg: 'Username Changed and Images updated to have new username as owner'});
  });
});

/////DELETE
usersRouter.delete('/users/:username', bodyParser.json(), eatAuth, function(req, res) {
  User.findOne({username: req.params.username}, function(err, data){
    if (err) return handleError(err, res);
    if (data && data._doc.username === req.user.username){
      User.remove({username: req.params.username}, function(err) {
        if (err) return handleError(err, res);
        res.json({msg: 'User removed'});
      });
    } else {
    res.json({msg: "no way!"});
    }
  });
});
