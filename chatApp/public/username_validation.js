$(document).ready(function () {
    var socket = io.connect();
    var username = $("#username").val();
    var usernameForm = $("#usernameForm");


    usernameForm.submit(function (e) {
        e.preventDefault();
        console.log("user name is", username);

        socket.emit("new user", username);

    });

    socket.on('user exist', function (data) {
        if (data) {
            username = data;
            console.log('server user', username)
        } else {
            $('#userNameError').html("Sorry Username is already taken");
        }

    });

});