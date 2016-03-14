
"use strict";

(function () {
    angular
        .module("ArtBridgeApp")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, $location, UserService) {

        $scope.update = update;
        $scope.closeButtonAlert = closeButtonAlert;

        function update(user) {

            // Confirmation message triggers ng-show visibility in the view.
            var callback = function (aUser) {
                $scope.message = "Profile updated successfully. (Click to close.)";
                $rootScope.currentUser = aUser;
                $location.url("/profile");
            };

            UserService.updateUser(user._id, user, callback);
        }

        function closeButtonAlert() {
            $scope.message = null;
        }
    }
})();