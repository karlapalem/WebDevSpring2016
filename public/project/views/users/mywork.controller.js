
"use strict";

(function () {
    angular
        .module("ArtBridgeApp")
        .controller("MyWorkController", myWorkController);

    function myWorkController($scope, $rootScope, WorkService) {

        $scope.addWork = addWork;
        $scope.updateWork = updateWork;
        $scope.deleteWork = deleteWork;
        $scope.selectWork = selectWork;

        var user = $rootScope.currentUser;

        // Get the current user's browse for rendering.
        getUserWork(user);
        function getUserWork(user) {
            var callback = function (userWork) {
                $scope.userWork = userWork;
            };

            WorkService.findAllWorkForUser(user._id, callback);
        }

        function addWork(workTitle, workUrl) {
            var newWork = {title: workTitle, url: workUrl};

            // Callback updates the form list after new form is added.
            var callback = function (work) {
                WorkService.findAllWorkForUser(
                    user._id,
                    function (userWork) {
                        $scope.userWork = userWork;
                    });
            };

            WorkService.createWorkForUser(user._id, newWork, callback);
        }

        function updateWork(workTitle, workUrl) {
            var newWork = {
                _id: $scope.selectedWork._id,
                title: workTitle,
                url: workUrl,
                userId: $scope.selectedWork.userId};

            // Callback updates the form list after new form is updated.
            var callback = function (work) {
                WorkService.findAllWorkForUser(
                    user._id,
                    function (userWork) {
                        $scope.userWork = userWork;
                    });
            };
            WorkService.updateWorkById(newWork._id, newWork, callback);
        }

        function deleteWork(index) {

            // Callback updates the form list after new form is deleted.
            var callback = function (work) {
                WorkService.findAllWorkForUser(
                    user._id,
                    function (userWork) {
                        $scope.userWork = userWork;
                    });
            };

            WorkService.deleteWorkById($scope.userWork[index]._id, callback);
        }

        function selectWork(index) {
            $scope.selectedWork = $scope.userWork[index];
            // formTitle sets the displayed name in the input box of the view.
            $scope.workTitle = $scope.selectedWork.title;
        }
    }
})();