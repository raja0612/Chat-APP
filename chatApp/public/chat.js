$(document).ready(function () {

    var socket = io.connect();
    var chatForm = $("#chatForm");
    var chatText = $("#chatText");
    var chatArea = $("#chatArea");

    chatForm.submit(function (e) {
        e.preventDefault();
        socket.emit("sender message", chatText.val());
        chatText.val('');
    });


    socket.on('server message', function (data) {
        chatArea.append(data + "</br>")

    });

});
