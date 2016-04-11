(function () {
  "use strict";
  
  angular
  .module("ArtApp")
  .controller("ProfileController", ProfileController);

  function ProfileController($location, $rootScope, UserService, ngDialog) {
    var model = this;
    model.update = update;
    model.back = back;
    model.genders = ["Male", "Female"];
    var user = $rootScope.user;
    
    userLoggedin();

    function update(updatedUserObj) {
      if(user) {
        var userid = user._id;
        UserService.updateUser(userid, updatedUserObj).then(updatedUser);
      } else {
        userLoggedin();
      }
    }

    function userLoggedin() {
      if(user == null) {
        ngDialog.open({
          template: 'views/Dialog/login.dialog.view.html',
        });
      } else {
        //reset the values
        model.user = {};
        model.user = user;
        console.log("Gender value = " + model.user.gender);
      }
    }

    function back() {
      $location.url("/art");
    }

    function updatedUser(userObj) {
      if(userObj != null) {
        ngDialog.open({
          template: 'views/Dialog/update.dialog.view.html',
        });
        $rootScope.user = userObj;
        $location.url("/profile");
      }
    }

  }

})();