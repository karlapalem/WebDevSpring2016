"use strict";
(function () {
 
  angular
  .module("ArtApp")
  .controller("NotificationController", NotificationController);

  function NotificationController($scope, $location, $rootScope, NotificationService, ngDialog) {
    var model = this;
    var user = $rootScope.user;
    model.deliverArt = deliverArt;
    init();

    $scope.predicate = 'orderDate';
    $scope.reverse = true;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };

    function deliverArt(orderId, notificationId) {
      NotificationService.deliverArt(orderId, notificationId).then(function(notifications) {
        init();
      })
    }

    function init() {
      if(user) {
        NotificationService.getNotificationForUser(user._id).then(function(notifications) {
          model.notifications = notifications;
        });
      } else {
        ngDialog.open({
          template: 'views/Dialog/login.dialog.view.html',
        });
        $location.url("/login");
      }
    }

  }
})();
