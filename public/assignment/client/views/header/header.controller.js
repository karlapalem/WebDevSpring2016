/**
 * Created by poojitha on 3/4/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($scope, $location, $rootScope) {

        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();