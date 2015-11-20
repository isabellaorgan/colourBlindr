//sign in

$('#signupButton').on('click', function(e) {
	var usernameToSend = $('#newUsername').val();
	var userVisionToSend = $('#newVisType').val();

  $.ajax({
	  type: "POST",
	  url: '/api/users',
	  data: JSON.stringify( {"username": usernameToSend,"visiontype": userVisionToSend}),
	  contentType: "application/json",
 		dataType: 'json'
	});

	$('#newUsername').val('');
	$('#newVisType').val('');
});