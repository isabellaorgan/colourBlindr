var Jimp = require('jimp');

Jimp.read('normal_colour.png', function(err, normal) {
  if (err) throw err;
  console.log('read successful!');
  for(var i = 0; i < 259; i++) {
  console.log(Jimp.intToRGBA(normal.getPixelColor(i,0)));
  }
});
