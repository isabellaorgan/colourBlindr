var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user.js');
process.env.MONGOLAB_URI = 'mongodb://localhost/user_test';

describe('the server', function(){
  before(function(done){
    this.userData = {username: 'test name'};
    done();
  });

  after(function(done){
    mongoose.connection.close(done());
    });

  it('should GET data from the db', function(done){
    chai.request('localhost:3000')
    .get('/api/users')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should POST data to the DB', function(done){
    chai.request('localhost:3000')
    .post('/api/users')
    .send(this.userData)
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.body.username).to.eql('test name');
      expect(res.body).to.have.property('_id');
      done();
    });
  });


  describe(',when you want it to,', function(){
    beforeEach(function(done){
      (new User({username: 'test guy'})).save(function(err, data){
        expect(err).to.eql(null);
        this.user = data;
        done();
      }.bind(this));
    });

    it('should DELETE data from the DB', function(done){
      chai.request('localhost:3000')
      .delete('/api/users/' + this.user._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('User removed');
        done();
      });
    });

    it('should modify data with a PUT request', function(done){
      chai.request('localhost:3000')
      .put('/api/users/' + this.user._id)
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body.msg).to.eql('User updated')
        done();
      });
    });
  });
});
