var express = require("express");

var app = express();

var port = process.env.PORT || 3000;

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

app.use("/assets/style.css", express.static(__dirname + "/public/style.css"));

app.use("/assets/chat.js", express.static(__dirname + "/public/chat.js"));




var users = [];

server.listen(port);

app.get("/", function (req, res) {

    res.sendFile(__dirname + '/index.html');

});


io.sockets.on('connection', function (socket) {

    socket.on('sender message', function (data) {
        io.sockets.emit('server message', {message:data,user:socket.username});

    });

    socket.on('new user', function (data, callback) {

        if (users.indexOf(data) != -1) {
            callback(false);

        } else {
            callback(true);
            socket.username = data;
            users.push(socket.username);
            updateConnetcedUsers();
            console.log("node connected users...",users);

        }

    });


    socket.on('disconnect',function(date){

        if(!socket.username) return;

        users.splice(users.indexOf(socket.username,1));
        updateConnetcedUsers();

    });


});


function updateConnetcedUsers(){
       io.sockets.emit('usernames', users);
}

