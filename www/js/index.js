document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    $('#loading-screen-cont').css('display', 'none');
}

var permanentStorage = window.localStorage;

function openLoading() {
    var loadingScreen = $('#loading-screen-cont');
    loadingScreen.css('display', 'block');
    loadingScreen.attr('class', 'animated fadeIn');
}

function closeLoading() {
    var loadingScreen = $('#loading-screen-cont');
    loadingScreen.attr('class', 'animated fadeOut');
    loadingScreen.css('display', 'none');

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

function isLoggedIn(){

    if(localStorage.email && localStorage.password != null){

        openLoading();

        Parse.User.logIn(localStorage.email, localStorage.password, {
            success: function (user) {
                closeLoading();

                console.log(localStorage.email);
                console.log(localStorage.password);

                window.location.href = 'dashboard.html';
            },
            error: function (user, error) {
                closeLoading();
            }
        });
    }
}

isLoggedIn();


function logIn() {

    var username = document.getElementById('email-input').value;
    var password = document.getElementById('password-input').value;
    openLoading();



    Parse.User.logIn(username, password, {
        success: function (user) {
            closeLoading();
            localStorage.email = username;
            localStorage.password = password;

            console.log(localStorage.email);
            console.log(localStorage.password);

            window.location.href = 'dashboard.html';
        },
        error: function (user, error) {
            closeLoading();
        }
    });
}