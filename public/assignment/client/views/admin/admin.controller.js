"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;

        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.order = order;
        vm.predicate='username';
        vm.reverse = true;

        var oldIndex = -1;

        function init() {

            vm.users = {};

            UserService.findAllUsers()

                .then(

                    function (users) {

                        vm.users = users;

                    }
                );

        }
        init();

        function addUser(user) {

            UserService.createUser(user)

                .then(

                    function (response) {

                        init();
                        vm.user = {};

                    }
                );
        }

        function removeUser(user) {

            UserService.deleteUserById(user._id)

                .then(

                    function (response) {

                        init();
                    }
                );
        }

        function selectUser(user) {

            oldIndex = vm.users.indexOf(user);

            vm.user = {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            }
        }

        function updateUser(user) {

            UserService.updateUser(user._id, user)

                .then(

                    function (response) {

                        if(response === "Updated") {

                            init();
                            vm.user = {};
                        }
                    }
                );
        }

        function order(predicate) {

            vm.reverse = (vm.predicate === predicate)? !vm.reverse: false;
            vm.predicate = predicate;
        }
    }
})();