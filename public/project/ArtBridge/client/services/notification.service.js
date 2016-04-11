"use strict";
(function () {
  
  angular
  .module("ArtApp")
  .factory("NotificationService", NotificationService);

  function NotificationService($http, $q) {

    var service = {
      getNotificationForUser: getNotificationForUser,
      deliverArt: deliverArt
    }
    return service;

    // Returns notifications for user
    function getNotificationForUser(userId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/user/" + userId + "/notification" )
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Updates the order status to delevired
    function deliverArt(orderId, notificationId) {
      var deferred = $q.defer();
      $http
      .put("/api/project/user/" + notificationId + "/deliveredArt/" + orderId)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

  }
})();