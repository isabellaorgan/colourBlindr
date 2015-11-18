// var rgbToHex = require(__dirname + '/algo').rgbToHex;
// var componentToHex = require(__dirname + '/algo').componentToHex;
// var protan = require(__dirname + '/algo').protan;
// var Jimp = require('patci-jimp');

// Jimp.read(__dirname + '/../public/images/craig.png', function(err, img) {
//   if (err) throw err;
//   img.protan()
//   .write('./public/images/protan.png');
// });

module.exports = exports = function(req, res, next) {

var rgbToHex = require(__dirname + '/algo').rgbToHex;
var componentToHex = require(__dirname + '/algo').componentToHex;
var protan = require(__dirname + '/algo').protan;
var Jimp = require('patci-jimp');

Jimp.read('https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', function(err, img) {
  if (err) throw err;
  img.protan()
  .write(__dirname + '/../public/images/protan2.png');
});
next();
}
