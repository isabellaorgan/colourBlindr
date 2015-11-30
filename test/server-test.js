var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
process.env.MONGOLAB_URI = 'mongodb://localhost/user_test';
var eatAuth = require(__dirname + '/../lib/eat_auth.js');
var httpBasic = require(__dirname + '/../lib/http_basic.js');


describe('the server', function(){
  before(function(done){
    this.userData = {username: 'test name', password: 'testpassword'};
    done();
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });

  it('should GET users from the db', function(done){
    chai.request('localhost:3000')
    .get('/api/users')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should GET images from the db', function(done){
    chai.request('localhost:3000')
    .get('/api/images')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should GET a registered end point', function(done){
    chai.request('localhost:3000')
    .get('/original')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('should send a 404 to an unregistered end point', function(done){
    chai.request('localhost:3000')
    .get('/5fbhjbu')
    .end(function(err, res){
      expect(res.status).to.eql(404);
      done();
    });
  });

  it('should POST users to the DB', function(done){
    chai.request('localhost:3000/api')
    .post('/signup')
    .send(this.userData)
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.token).to.have.length.above(0);
      done();
    });
  });


  describe(',when auth is needed,', function(){
    beforeEach(function(done) {
      var user = new User();
      user.username = 'testusername';
      user.generateHash('testpassword', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });


    it('should be able to sign in', function(done) {
      chai.request('localhost:3000/api')
      .get('/signin')
      .auth('testusername', 'testpassword')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
    });

    it('should be able to authenticate with eat auth', function(done) {
      var token = this.token;
      var req = {
        headers: {
          token: token
        }
      };

      eatAuth(req, {}, function() {
        expect(req.user.username).to.eql('testusername');
        done();
      });
    });

      it('should POST images to the DB', function(done){
    chai.request('localhost:3000')
    .post('/api/images')
    .send({imagepath: '/test-path', token : this.token})
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('posted new image');
      done();
    });
  });


    it('should modify users with a PUT request', function(done){
      chai.request('localhost:3000')
      .put('/api/users/testusername')
       .send({username: "bob", token: this.token})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('Username Changed and Images updated to have new username as owner');
        done();
      });
    });

    it('should DELETE users from the DB', function(done){
      chai.request('localhost:3000')
      .delete('/api/users/testusername')
      .send({token: this.token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('User removed');
        done();
      });
    });
  });
});
