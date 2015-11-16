var express = require('express');
var app = express();

app.get('/users', function(req, res) {
    res.send("hello");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("listening on some port")
});
