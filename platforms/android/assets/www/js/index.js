document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $('#loading-screen-cont').css('display', 'none');
}


// INIT PARSE
Parse.initialize("kUTBf0WdFm2VQfj84d3gC3zuFxAkqRczMirZFfGX", "dHf9F4c8RbdNC1mhQRqvr5MwiWgo71hTDbP7aX1Z");

var isLoggingIn = true;


function openLoading() {
    var loadingScreen = $('#loading-screen-cont');
    loadingScreen.css('display', 'block');
    loadingScreen.attr('class', 'animated bounceIn');
}

function signUp() {

    var username = document.getElementById('name-input').value;
    var password = document.getElementById('password-input').value;
    var email = document.getElementById('email-input').value;

    console.log("Getting Values");
    console.log(username);
    console.log(password);
    console.log(email);

    console.log("Opening Loading");
    openLoading();

    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    console.log("user data set");

    user.signUp(null, {
        success: function (user) {
            console.log(user);
            window.location.href = 'dashboard.html';
        },
        error: function (user, error) {
            console.log(error);
        }
    });
}

function logIn() {

    Parse.User.logIn("myname", "mypass", {
        success: function (user) {
            closeLoading();
        },
        error: function (user, error) {
            closeLoading();
        }
    });
}