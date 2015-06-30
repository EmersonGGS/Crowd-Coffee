// ON LOAD VARIABLES
var currentUser = Parse.User.current();
var currentUsername = currentUser.get("username");
var friendsListArray = [];

// ON LOAD CHECK FOR FRIENDS, HANDLES CREATING NEW FRIENDS LISTS
var Friends = Parse.Object.extend("Friends");
var query = new Parse.Query(Friends);
query.equalTo("listowner", currentUsername);
query.find({
    success: function (results) {
        if (results.length > 0) {

            for (var i = 0; i < results[0].attributes.friendslist.length; i++) {

                $("#friends-list").append("<li class='animated fadeIn'>" + results[0].attributes.friendslist[i] + "<img class='delete-icon' src='img/delete.png'/></li>");
                $("#friends-list").append("<div class='list-divider'></div>");
                friendsListArray.push(results[0].attributes.friendslist[i]);

            }

        } else {
            // If they don't have any list created
            var Friends = Parse.Object.extend("Friends");
            var friends = new Friends();

            friends.set("listowner", currentUsername);
            friends.set("friendslist", friendsListArray);

            friends.save(null, {
                success: function (friends) {
                    console.log("Success");
                },
                error: function (friends, error) {
                    console.log("Error, " + error.message);
                }
            });
        }
    },
    error: function (error) {
    }
});


/////////////////
// ADD FRIEND //
///////////////
function addFriend() {

    // Grab desired username to add to friends list
    var username = document.getElementById('add-friend-input').value;

    var query = new Parse.Query(Parse.User);
    query.equalTo("username", username);
    query.find({
        success: function (result) {
            console.log(result);
            if (result.length === 0) {
                console.log("NOT ADDED");
            } else {

                console.log("ADDED!");

                //Check if friend is already on the list
                var isAlreadyAdded = $.inArray(username, friendsListArray) > -1;
                if (isAlreadyAdded) {
                    //Do nothing, friend already exists
                } else {
                    //Add friend to friends list
                    //Add user to array
                    friendsListArray.push(username);
                    var Friends = Parse.Object.extend("Friends");
                    var query = new Parse.Query(Friends);
                    query.equalTo("listowner", currentUsername);
                    query.first({
                        success: function (results) {

                            results.set("friendslist", friendsListArray);
                            results.save();
                            $("#friends-list").append("<li class='animated fadeIn'>" + username + "<img class='delete-icon' src='img/delete.png'/></li>");
                            username = "";
                        },
                        error: function (error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });
                }
            }
        }
    });


    console.log("Adding: " + username);
    var query = new Parse.Query(Parse.User);
    query.equalTo("gender", "female");  // find all the women
    query.find({
        success: function (women) {
            // Do stuff
        }
    });
}


////////////////////
// REMOVE FRIEND //
//////////////////
function removeFriend() {

}