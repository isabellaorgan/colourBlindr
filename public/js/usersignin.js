//sign in
$('#signinButton').on('click', function(e) {
	var usernameToSend = $('#usernameId').val();
	var passwordToSend = $('#password').val();

  $.ajax({
	  type: 'GET',
	  url: '/api/signin',
	  headers: {
	  	"Authorization": "Basic " + btoa(usernameToSend + ":" + passwordToSend)
	  },
	  contentType: 'application/json',
 		dataType: 'json',
 		success: function() {
 				self.location = '/upload'
 		}
	});
});

