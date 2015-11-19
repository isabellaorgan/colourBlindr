//sign in

$('#signupButton').on('click', function(e) {
	console.log('clicked!');
    var usernameToSend = $('#usernameId').val();

    // e.preventDefault();
    $.post('/api/users', '{"username":"usernameToSend"}', function(res, data) {
			console.log('username');
    });
});
console.log('outside!');