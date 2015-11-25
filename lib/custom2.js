module.exports = exports = function(res) {

	var body = '<!DOCTYPE html>' +
'<html>' +
  '<head>' +
  '<meta charset="utf-8">' +
	'<title>Colo(u)rBlindr</title>' +
  '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">' +
  '<link rel="stylesheet" href="css/reset.css">' +
  '<link rel="stylesheet" href="css/fonts.css">' +
  '<link rel="stylesheet" href="css/base.css">' +
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
      '<div class="app-desc"> Welcome, <h3>' + process.env.USERNAME + '!' +
      '<div id="token">' + process.env.TOKEN + '</div>' +
      '<p> Let\'s Upload Some Images!</p>' +
        '<br>' +
        '<p id="added"></p>' +
        '<p class="added">You added ' + process.env.IMAGEPATH+ ' to the database!</p>' +
      '</div>' +
      '<div class="large-10 large-offset-1 columns">' +
      '</div>' +
    '</div>' +
    '<div class="row">' +
      '<div class="large-1 columns">' +
        '<div id="signup">' +
          // '<form>' +
          //   '<input type="file" name = "upload" placeholder="Upload a Picture" id="newImage">' +
          //   '<input type="button" value="Upload Image" id="uploadButton">' +
          //   '<input type="button" id="uploadimage" value="THEN click here to show the picture in the browser!" id="uploadButton" />'

          // '</form>' +

          ////// formidable
          '<form action=" /uploadedfile"  enctype="multipart/form-data" method="post">' +
  '<input type="file" name="upload" multiple="multiple" id="newImage">' +
   // '<input type="button" value="FIRSTclick here to send the file data to the database!" id="uploadButton">' +
  '<input type="submit" value="THEN click here to show the picture in the browser!" id="uploadButton" />' +
  '</form>' +
  //////////////////

  // This page displays the image. This is hte only difference between the two pags!
'<img src="/showfile" id ="uploadedimage"/>' +


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