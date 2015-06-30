var currentUser = Parse.User.current();
if (currentUser) {
    console.log(currentUser);
    $(".welcome-message").text("Hey there, " + currentUser.attributes.username);
} else {
    console.log("Not logged in");
}