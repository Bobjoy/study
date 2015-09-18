var http = require('http');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello NodeJS\n');
}).listen('172.16.1.112', 8124);

console.log('Server running at http://172.16.1.112:8124');