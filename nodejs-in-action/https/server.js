var httpsModule = require('https');
var fs = require('fs');

var https = httpsModule.Server({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('server.crt')
}, function(req, res){
  res.writeHead(200);
  res.end('hello world\n');
});

https.listen(443, function(err){
  console.log('https listening on port: 443');
});
