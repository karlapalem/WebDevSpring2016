/**
 * Created by poojitha on 3/4/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController",AdminController);

    function AdminController($location,$scope){

        $scope.$location=$location;

    }
}) ();