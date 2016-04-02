(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {

        var vm = this;

        vm.register = register;

        function register(user) {

            user.emails = user.emails.trim().split(",");

            UserService.createUser(user).then(function(users) {

                UserService.findUserByUsername(user.username).then(function (newUser) {

                    UserService.setCurrentUser(newUser);

                    $location.url("/profile");
                });
            });
        }
    }
})();