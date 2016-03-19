"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location, UserService) {

        var vm = this;

        function init() {

            UserService.getCurrentUser().then(function (response) {

                if(response.data) {

                    UserService.setCurrentUser(response.data);

                }
            });
        }
        init();
    }
})();