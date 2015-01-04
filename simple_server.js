var fs = require('fs');
var http = require('http');
var index = fs.readFileSync('html5up-overflow/index.html');
function handle_incoming_request(req, res) {
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);
	res.writeHead(200, {'Content-Type':'text/html'});
	res.end(index);
}
var s = http.createServer(handle_incoming_request);
s.listen(8080);