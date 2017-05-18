var express = require('express');
var app = express();
var child_process = require('child_process');

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/view/" + "index.html");
});

app.use(express.static('public'));
app.use(express.static('dist'));

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log('App listening at http://localhost:%s', port);
	child_process.exec("start http://localhost:3000");
});