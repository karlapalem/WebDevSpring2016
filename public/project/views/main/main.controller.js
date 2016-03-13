
"use strict";

(function () {
    angular
        .module("ArtBridgeApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {

        $scope.$location = $location;
    }
})();