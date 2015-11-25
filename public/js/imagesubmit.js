//sign in


$('#uploadButton').on('click', function(e) {
	var imageToSend = $('#newImage').val();
	var token = $('#token').text();


  $.ajax({
	  type: "POST",
	  url: '/api/images',
	  data: JSON.stringify( { "imagepath": imageToSend, "token": token } ),
	  contentType: "application/json",
 		dataType: 'json',
 		success: function() {
 			console.log("added to database")
 			// $('.added').remove();
 			// $('#added').append('<p class="added">You added ' + imageToSend + ' to the database!</p>');

 		}
	});

});

