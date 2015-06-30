// ON LOAD VARIABLES
var currentUser = Parse.User.current();
var currentUsername = currentUser.get("username");
var friendsListArray = [];
var selectedFriends = [];

// ON LOAD CHECK FOR FRIENDS, HANDLES CREATING NEW FRIENDS LISTS
var Friends = Parse.Object.extend("Friends");
var query = new Parse.Query(Friends);
query.equalTo("listowner", currentUsername);
query.find({
    success: function (results) {
        if (results.length > 0) {
            for (var i = 0; i < results[0].attributes.friendslist.length; i++) {
                $("#friends-list").append('<li id="'+ results[0].attributes.friendslist[i] + '" onclick="addFriendToGroup(this.id)" class="animated fadeIn">' + results[0].attributes.friendslist[i] + '<img src="img/check-mark.png"/></li>');
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

function addFriendToGroup(idText){

    var clickedUsername = $(event.target).attr("id");
    console.log("Clicked: " + clickedUsername);

    var isAlreadyAdded = $.inArray(clickedUsername, selectedFriends) > -1;
    if (isAlreadyAdded) {
        selectedFriends.splice($.inArray(clickedUsername, selectedFriends), 1);
        console.log(selectedFriends);
        $(event.target).css("border-right","45px solid #95a5a6");
    } else {
        selectedFriends.push(clickedUsername);
        console.log(selectedFriends);
        $(event.target).css("border-right","60px solid #52B3D9");
console.log(event.target);
    }
}

function openNameGroup(){
    $('#app-container').append("<div class='popup-name-group'><div class='popup-inner'><h2>Enter a name for this group</h2><p>Once created, all your buddies will get a notification.</p><input type='text' id='group-name' placeholder='group name'><button class='cancel-btn' onclick='closeNameGroup()'>CANCEL</button><button class='create-btn'>CREATE</button></div></div>");
}

function closeNameGroup(){
    $('.popup-name-group').remove();
}