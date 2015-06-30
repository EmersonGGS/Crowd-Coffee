// INIT PARSE

// TOGGLE MENU CODE
$("#menu-icon").click(toggleMenu);
var menuIsOpen = true;

$("#logout-button").on("click", function () {
    logOut();
});

function logOut() {
    Parse.User.logOut();
    localStorage.email = null;
    localStorage.password = null;
    window.location.href = 'index.html';
}

function toggleMenu() {
    if (menuIsOpen) {
        $('#main-navigation').css("display", "block");
        $('#main-navigation').addClass("slideInLeft");
        $('#main-navigation').removeClass("slideOutLeft");
        menuIsOpen = false;
    } else {
        $('#main-navigation').addClass("slideOutLeft");
        $('#main-navigation').removeClass("slideInLeft");
        menuIsOpen = true;
    }
}