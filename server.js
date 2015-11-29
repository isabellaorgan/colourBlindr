var express = require('express');
var fs = require('fs');
var app = express();
var transform = require(__dirname + '/lib/jpeg.js');
var delimg = require(__dirname + '/lib/delimg.js');
var port = process.env.PORT || 3000;
var usersRouter = require(__dirname + '/routes/users_routes.js');
var imagesRouter = require(__dirname + '/routes/images_routes.js');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/colourblindr_dev';
var mongoose = require('mongoose');
var htmlTemplate = require(__dirname + '/lib/html_template.js');
var customHTML = require(__dirname + '/lib/custom.js');
var tempAppSecret = 'ThisReallyNeedsToBeChanged';


var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
var aws = require('aws-sdk');



process.env.APP_SECRET = process.env.APP_SECRET || tempAppSecret ;
mongoose.connect(mongoURI);

app.use(express.static(__dirname + '/public'));

app.use('/api', imagesRouter);
app.use('/api', usersRouter);

app.get('/upload', function(req, res) {
	customHTML(res);
});

app.get('/original', function(req, res) {
	htmlTemplate(req, res, 'original.jpg');
});

app.get('/transformed', delimg, transform, function(req, res) {
	htmlTemplate(req, res, 'protan.jpg');
});

app.get('/compare', delimg, transform, function(req, res) {
	htmlTemplate(req, res, 'protan.jpg', '<img src="' + process.env.IMAGEPATH + '" alt="original image">'|| '<img src="images/original.jpg" alt="original image">');
});


app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET_NAME,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET_NAME+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

app.get('/*', function(req, res) {
	res.status(404).sendFile('404.html', {root: __dirname + '/public'});
});

app.listen(port, function() {
	console.log('The server is running on port: ' + port);
});

