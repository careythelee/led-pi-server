//var express = require('express');
var express = require('express.io');
var app = express().http().io();
//var app = require('express.io')();
var bodyParser = require('body-parser');
var multer = require('multer');
var childProcess = require('child_process');
var Gpio = require ('onoff').Gpio,
	led = new Gpio(18, 'out');
var data = null;


app.listen(8080);
//var io = require('socket.io').listen(server);
//app.http().io();

app.get('/switch',function(req,res){
	if (led.readSync()){
		res.end('on');
	} else {
		res.end('off');
	} 
});

app.use(express.static(__dirname + "/public"));

//io.sockets.on('connection', function(socket) {



app.use(bodyParser.json());
//app.use(body.urlencoded({extended:true}));
/*
app.use(multer());
app.post('/pound',function(req,res){
	console.log('post received');
	console.log(req.body.name);
	console.log(req.body.email);
	console.log(req.body.message);
	postblink();
	if (req.body.name == "Carey"){
		childProcess.exec('omxplayer -o local testmusic.mp3', function(){});
	}
})
*/

app.io.route('ready', function(req){
	console.log('new Visitor');
});

app.post('/switch',function(req,res){
	flipLed();
	console.log(req.param);
	console.log (led.readSync());
	if (led.readSync()){
		data = true;
	} else {
		data = false;
	} 
	app.io.broadcast('notification', data);
});

var flipLed = function () {
	var oldLedValue = led.readSync();
	var newLedValue = oldLedValue === 0 ? 1 : 0;
	led.writeSync(newLedValue);
};

/*
var postblink = function(){
	var timer = setInterval(flipLed, 500);
	setTimeout(function(){
		clearInterval(timer);
		led.writeSync(0);
	}, 5000);	
};
*/







process.on('SIGINT', function(){
	led.unexport();
	process.exit();
});