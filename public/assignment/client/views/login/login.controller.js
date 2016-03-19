"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {

        var vm = this;

        vm.login = login;

        function login(user) {

            UserService.findUserByCredentials(user.username, user.password).then(isUserPresent);
        }

        function isUserPresent(response) {

            if(response) {

                UserService.setCurrentUser(response);

                $location.url("/profile");
            }
        }
    }
})();