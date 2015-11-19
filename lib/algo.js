var blinder = require('color-blind');

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return blinder.protanopia('#' + componentToHex(r) + componentToHex(g) + componentToHex(b));
}

function protan() {
  return blinder.protanopia(rgbToHex(hex));
}

module.exports.rgbToHex = rgbToHex;
module.exports.componentToHex = componentToHex;
module.exports.protan = protan;
