//sign up
$('#signupButton').on('click', function(e) {
	var usernameToSend = $('#newUsername').val();
	var passwordToSend = $('#password').val();
	var userVisionToSend = $('#newVisType').val();

  $.ajax({
	  type: 'POST',
	  url: '/api/signup',
	  data: JSON.stringify( {'username': usernameToSend, 'password': passwordToSend, 'visiontype': userVisionToSend}),
	  contentType: 'application/json',
 		dataType: 'json',
 		success: function() {
 				self.location = '/upload'
 		}
	});
});


