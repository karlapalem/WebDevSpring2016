(function () {
  "use strict";
  
  angular
    .module("ArtApp")
    .controller("LoginController", LoginController);

  function LoginController($scope, $location, $rootScope, UserService, ngDialog) {
    $rootScope.user = null;
    $rootScope.artId = null;
    $scope.login = login;

    function login() {
      var username = $scope.user.username;
      var password = $scope.user.password;
      UserService.login(username, password).then(loggedInUser);
    }

    function loggedInUser(userObj) {
      if(userObj != null) {
        $rootScope.user = userObj;
        $location.url("/art");
      }
      else {
        ngDialog.open({
            template: 'views/Dialog/notification.dialog.view.html',
        });
      }
    }
  }
})();