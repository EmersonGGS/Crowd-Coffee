// INIT PARSE
Parse.initialize("kUTBf0WdFm2VQfj84d3gC3zuFxAkqRczMirZFfGX", "dHf9F4c8RbdNC1mhQRqvr5MwiWgo71hTDbP7aX1Z");
console.log("Parse connected Dashboard JS");



var currentUser = Parse.User.current();
if (currentUser) {
    console.log(currentUser);
} else {
    console.log("Not logged in");
}
currentUser.fetch().then(function (fetchedUser) {
    var name = fetchedUser.getUsername();
    $('.alertmsg').html('<div id="alert"><p>You are' + name + '</div>');
});
console.log();
$(".welcome-message").text("Hey there, " + currentUser.attributes.username);

// TOGGLE MENU CODE
$("#menu-icon").click(toggleMenu);
var menuIsOpen = false;

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