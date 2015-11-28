module.exports = exports = function(req, res, img, optional) {
	if (optional === undefined) optional = '';
	var body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html;' +
  'charset=UTF-8" + />' +
  '<link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css">' +
  '<link rel="stylesheet" href="css/reset.css">' +
  '<link rel="stylesheet" href="css/fonts.css">' +
  '<link rel="stylesheet" href="css/base.css">' +
  '</head>' +
  '<body>' +
  '<div class="row">' +
  '<img class="clrgls" src="img/clrgls.jpg">' +
  '<div class="cb-hdr"> <header id="colourblindr-header"><a href="https://colourblindr.herokuapp.com/">Colo(u)rBlindr</a></header></div>' +
  '<div class="large-11 columns"></div>' +
'</div>' +
'<div class="row">' +
'<div>' +
  optional +
  '<img src="images/' + img + '" alt="protan image">' +
  '</div>' +
  '<div class="large-10 large-offset-1 columns"></div>' +
'</div>' +

'<div class="row">' +
  '<div class="large-1 columns">' +
  '<div class="large-9 large-offset-2 columns"></div>' +
'</div>' +
'</div>' +
'<div class="row">' +
  '<div class="large-1 columns"></div>' +
  '<div class="contact-info"><a href="https://github.com/isabellaorgan/colourBlindr" class="icon-github"> Colo(u)rBlindr on GitHub</a><br>' +
  '<a href="contact.html">Contact the Colo(u)rBlindr team</a></div>' +
'</div>' +
  '</body>' +
  '</html>';
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(body);
	res.end();
};
