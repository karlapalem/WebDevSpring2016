"use strict";
(function () {
  
  angular
  .module("ArtApp")
  .factory("OrderService", OrderService);

  function OrderService($http, $q) {

    var service = {
      getArtOrderedByUserId: getArtOrderedByUserId
    }
    return service;

    function getArtOrderedByUserId(userId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/user/" + userId + "/orders")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

  }
})();
