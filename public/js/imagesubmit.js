//sign in
$('#uploadButton').on('click', function(e) {
	console.log("click")
	var imageToSend = $('#newImage').val();

  $.ajax({
	  type: "POST",
	  url: '/api/images',
	  data: JSON.stringify( { "imagepath": imageToSend } ),
	  contentType: "application/json",
 		dataType: 'json',
 		success: function() {
 			$('#added').append('<p>You added ' + imageToSend + ' to the database!</p>')
 		}
	});
});
