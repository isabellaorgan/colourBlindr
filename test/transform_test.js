var expect = require('chai').expect;
var rgbToHex = require(__dirname + '/../lib/algo').rgbToHex;
var componentToHex = require(__dirname + '/../lib/algo').componentToHex;
var protan = require(__dirname + '/../lib/algo').protan;
var Jimp = require('patci-jimp');

describe('the transform process', function() {

  it('should convert a single rgb value to hex', function() {
    expect(componentToHex('255').to.not.eql('255'));
  });

  it('should convert a full RGB val to hex', function() {
    expect(rgbToHex('255', '0', '50').to.not.eql('255', '0', '50'));
  });

  it('should transform a hex value', function() {
    expect(protan('#FEF571').to.not.eql('#FEF571'));
  });
});
