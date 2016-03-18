/**
 * Created by poojitha on 3/4/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .controller("MainController", mainController);

    function mainController($scope, $location) {

        $scope.$location = $location;
    }
})();