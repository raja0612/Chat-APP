$(document).ready(function () {
    $("#chatDiv").hide();

    var socket = io.connect();
    var chatForm = $("#chatForm");
    var chatText = $("#chatText");
    var chatArea = $("#chatArea");

    //user form registration
    var usernameForm = $("#usernameForm");
    var userDiv = $("#userDiv");
    var chatDiv = $("#chatDiv");
    var username = $('#username');
    var userNameError = $('#userNameError');
    var users = $('#users');



    chatForm.submit(function (e) {
        e.preventDefault();
        socket.emit("sender message", chatText.val());
        chatText.val('');
    });


    socket.on('server message', function (data) {
        chatArea.append('<b>'+data.user+'</b>  :'+data.message + "</br>")

    });

    usernameForm.submit(function (e) {
        e.preventDefault();
        socket.emit("new user", username.val(), function (data) {
            if (data) {
                $("#userDiv").hide();
                $("#chatDiv").show();
            } else {
                $("#userDiv").show();
                usernameForm.html('sorry...! user name is already taken');

            }
        });
        //reset user name text input
        username.val('');

    });



    socket.on('usernames', function (data) {
        var connectedUsers = '';
        for (var i = 0; i < data.length; i++) {

            connectedUsers += data[i] + '<br/>'
            $('#users').html(connectedUsers);
           
        }
    });



});
