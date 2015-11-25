//sign in
$('#uploadButton').on('click', function(e) {
	console.log("click")
	var imageToSend = $('#newImage').val();
	var token = $('#token').text();

  $.ajax({
	  type: "POST",
	  url: '/api/images',
	  data: JSON.stringify( { "imagepath": imageToSend, "token": token } ),
	  contentType: "application/json",
 		dataType: 'json',
 		success: function() {
 			$('.added').remove();
 			$('#added').append('<p class="added">You added ' + imageToSend + ' to the database!</p>')
 		}
	});
});
