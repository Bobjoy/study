var http = require("http");
 
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("app.js, PID = " + process.pid + "<br/>");
 
    if (req.url == "/end") {
        throw "Crash!";
    }
}).listen(12345, '127.0.0.1');