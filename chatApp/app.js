var express = require("express");

var app = express();

var port = process.env.PORT || 3000 ;

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

app.use("/assets/style.css", express.static(__dirname+"/public/style.css"));

app.use("/assets/chat.js", express.static(__dirname+"/public/chat.js"));

app.use("/assets/username_validation.js", express.static(__dirname+"/public/username_validation.js"));


var users = [];

server.listen(port);

app.get("/",function(req,res){
    
	res.sendfile(__dirname+'/index.html');

});

app.get("/login",function(req,res){
    
	res.sendfile(__dirname+'/username.html');

});

io.sockets.on('connection',function(socket){

    socket.on('sender message',function(data){

        io.sockets.emit('server message',data);

    });



});