var fs = require('fs')

module.exports = exports = function(req, res, next){
  fs.readFile(__dirname + '/../public/images/protan.png', function(err, data){
    if (err) {
      console.log("not found!!!");
      next();
    }else {
      fs.unlink(__dirname + '/../public/images/protan.png', next());
    }
  })
};
