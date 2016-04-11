"use strict";
(function () {

  angular
  .module("ArtApp")
  .factory("PaymentService", PaymentService);

  function PaymentService($http, $q) {

    var service = {
      payForArt: payForArt
    }
    return service;

    function payForArt(token, order) {
      var deferred = $q.defer();
      $http
      .post("/api/project/client/payForArt/" + token.id, order)
      .success(function(response) {
        deferred.resolve(response);
      })
      .error(function(data, status){
        deferred.resolve("Failure");
      });
      return deferred.promise;
    }
  }
})();