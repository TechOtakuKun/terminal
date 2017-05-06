var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/view/" + "index.html");
});

app.use(express.static('public'));

var server = app.listen(3000, function() {
	var port = server.address().port;

	console.log('App listening at http://localhost:%s', port);
});