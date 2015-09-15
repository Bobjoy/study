var express = require('express');
var app = express();
var fs = require('fs');

app.get('/listUsers', function (req, res) {
	fs.readFile(__dirname + '/users.json', 'utf8', function (err, data) {
		console.log(data);
		res.end(data);
	});
});

var user = {
	"user4": {
		"name": "tomson",
		"password": "password4",
		"profession": "clerk",
		"id": 4
	}
};

app.get('/addUser', function (req, res) {
	fs.readFile(__dirname + '/users.json', 'utf8', function (err, data) {
		data = JSON.parse(data);
		data['user4'] = user['user4'];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});

app.get('/delUser/:id', function(req, res){
	fs.readFile(__dirname + '/users.json', 'utf8', function(err, data){
		var users = JSON.parse(data);
		delete users['user' + req.params.id];
		console.log(users);
		res.end(JSON.stringify(users));
	});
});

app.get('/:id', function(req, res){
	fs.readFile(__dirname + '/users.json', 'utf8', function(err, data){
		var users = JSON.parse(data);
		var user = users['user' + req.params.id];
		console.log(user);
		res.end(JSON.stringify(user));
	});
});

var server = app.listen(8081, '127.0.0.1', function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为 http://%s:%s', host, port);
});