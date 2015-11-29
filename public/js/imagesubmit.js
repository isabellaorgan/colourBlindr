var imageToSend;
$('#sub').on('click', function(e) {
	// var imageToSend = $('#newImage').val();
	var token = $('#token').text();
    console.log(imageToSend)
    console.log(token)


  $.ajax({
	  type: "POST",
	  url: '/api/images',
	  data: JSON.stringify( { "imagepath": imageToSend, "token": token } ),
	  contentType: "application/json",
 		dataType: 'json',
 		success: function() {
 			console.log("added to database")
 			$('.added').remove();
 			$('#added').append('<p class="added">You added ' + imageToSend + ' to the database!</p>');
            $('#added').append('<img src="' + imageToSend + '"'  + 'alt="uploaded image">');


 		}
	});

});


///// post to AWS.
(function() { // this IIFE posts to AWS before you click the button to post to the mongo DB
    document.getElementById('newImage').onchange = function(){
        var files = document.getElementById("newImage").files;

        var file = files[0];
        if(file == null){
            alert("No file selected.");
        }
        else{
            get_signed_request(file);
        }
    };
})();

function get_signed_request(file){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                upload_file(file, response.signed_request, response.url);
            }
            else{
                alert("Could not get signed URL.");
            }
        }
    };
    xhr.send();
}


function upload_file(file, signed_request, url){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(url)
           imageToSend = url;
            // document.getElementById("avatar_url").value = url;
        }
    };
    xhr.onerror = function() {
        alert("Could not upload file.");
    };
    xhr.send(file);
}
