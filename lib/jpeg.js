
var rgbToHex = require(__dirname + '/algo').rgbToHex;
var componentToHex = require(__dirname + '/algo').componentToHex;
var protan = require(__dirname + '/algo').protan;
var Jimp = require('jimp');

Jimp.read('../public/images/orig.jpeg', function(err, img) {
  if (err) throw err;
  img.protan()
  .write('public/images/protan.jpeg');
});


