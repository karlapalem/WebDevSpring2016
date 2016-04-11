"use strict";
(function () {
  
  angular
    .module("ArtApp")
    .controller("RegisterController", RegisterController);

  function RegisterController($location, $rootScope, UserService, ngDialog) {
    var model = this;
    model.register = register;
    model.signIn = signIn;
    model.user = {};
    model.user.password = "";
    model.user.verifyPassword = "";
    model.genders = ["Male", "Female"];

    function register(user) {
      if(user.password === user.verifyPassword) {
        UserService.registerUser(user).then(loggedInUser);
      } else {
        ngDialog.open({
          template: 'views/Dialog/passwordDoesnMatch.dialog.view.html',
        });
        model.user.password.focus();
      }    
    }

    function signIn() {
      $location.url("/login");
    }
    
    function loggedInUser(userObj) {
      if(userObj != null) {
        $rootScope.user = userObj;
        $location.url("/art");
      } else {
        ngDialog.open({
          template: 'views/Dialog/duplicateUsername.dialog.view.html',
        });
      }
    }
  }
})();