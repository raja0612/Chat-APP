$(document).ready(function () {
    var username = $("#username");
     var usernameForm = $("#usernameForm");


    usernameForm.submit(function (e) {
        e.preventDefault();
         console.log("user name is",username.val());
    });

});