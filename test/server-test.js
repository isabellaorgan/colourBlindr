var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
require(__dirname + '/../server.js');

describe('the server', function(){
  it('should start', function(done){
    chai.request('localhost:3000')
    .get('/')
    .end(function(err, res){
      expect(err).to.eql(null);
      done();
    });
  });
});
