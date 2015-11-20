module.exports = exports = function(res) {

	var body = '<!DOCTYPE html>' +
'<html>' +
  '<head>' +
  '<meta charset="utf-8">' +
	'<title>Colo(u)rBlindr</title>' +
  '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">' +
  '<link rel="stylesheet" href="https://colourblindr.herokuapp.com/css/reset.css">' +
  '<link rel="stylesheet" href="https://colourblindr.herokuapp.com/css/fonts.css">' +
  '<link rel="stylesheet" href="https://colourblindr.herokuapp.com/css/base.css">' +
  '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>' +
  '</head>' +
  '<body>' +
    '<div class="row">' +
      '<div class="cb-hdr">' +
        '<header id="colourblindr-header">Colo(u)rBlindr</header>' +
      '</div>' +
      '<div class="large-11 columns">' +
        '<a href="https://colourblindr.herokuapp.com">home</a>' +
        '|' +
        '<a href="https://colourblindr.herokuapp.com/original">original</a>' +
        '|' +
        '<a href="https://colourblindr.herokuapp.com/transformed">transformed</a>' +
        '|' +
        '<a href="https://colourblindr.herokuapp.com/compare">compare</a>' +
        '<br>' +
      '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="app-desc"> Welcome, <h3>' + process.env.USERNAME + '</h3> Let\'s Upload Some Images!' +
        '<br>' +
        '<p id="added"></p>' +
      '</div>' +
      '<div class="large-10 large-offset-1 columns">' +
      '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="large-1 columns">' +
        '<div id="signup">' +
          '<form>' +
            '<input type="file" placeholder="Upload a Picture" id="newImage">' +
            '<input type="button" value="Upload Image" id="uploadButton">' +
          '</form>' +
        '</div>' +
      '</div>' +
      '<div class="large-9 large-offset-2 columns">' +
      '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="large-1 columns">' +
      '</div>' +
      '<div class="contact-info">' +
        '<a href="https://github.com/isabellaorgan/colourBlindr" class="icon-github"> Colo(u)rBlindr on GitHub</a>' +
        '<br>' +
        '<a href="https://colourblindr.herokuapp.com/contact.html">Contact the Colo(u)rBlindr team</a>' +
      '</div>' +
    '</div>' +
    '<script src="js/imagesubmit.js"></script>' +
  '</body>' +
'</html>';

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(body);
	res.end();
};
