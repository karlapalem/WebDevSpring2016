"use strict";
(function () {
  
  angular
  .module("ArtApp")
  .factory("ArtService", ArtService);

  function ArtService($http, $q) {

    var service = {
      addArt: addArt,
      getGenres : getGenres,
      getArtById: getArtById,
      
      deleteArtById: deleteArtById,
      getArtOfferedByUser: getArtOfferedByUser,
      // EditArtOffered
      updateArtById: updateArtById,

      // Home page- display art
      getAvailableArtItems: getAvailableArtItems,
      getAvailableArtItemsForUser: getAvailableArtItemsForUser,
      // Search Art
      searchArt: searchArt
    };
    return service;

    // Takes userId, art. Adds userId, guid to art and adds
    // this art to existing artItems.
    function addArt(userId, artObj) {
      var deferred = $q.defer();
      $http.post("/api/project/user/" + userId + "/art", artObj)
      .success(function(res){
        deferred.resolve(res);
      });
      return deferred.promise;
    }


    function getGenres() {
      var deferred = $q.defer();
      $http
      .get("/api/project/art/genre")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Get all artItems offered by user
    function getArtOfferedByUser(userId) {
      var deferred = $q.defer();
      $http
      .post("/api/project/user/" + userId + "/artOffered")
      .success(function(artItems) {
        deferred.resolve(artItems);
      })
      return deferred.promise;
    }

    // Get artItem by Id
    function getArtById(artId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/art/" + artId)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Delete art by Id
    // Only owner of the art shd be able to delete
    function deleteArtById(artId) {
      var deferred = $q.defer();
      $http
      .delete("/api/project/art/" + artId)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
    
    // Gets all the art items that are available for
    // users to order in the home page
    function getAvailableArtItems() {
      var deferred = $q.defer();
      $http
      .get("/api/project/art")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Gets all the art items that are available for
    // users to order in the home page
    function getAvailableArtItemsForUser(userId) {
      var deferred = $q.defer();
      $http
      .get("/api/project/user/" + userId +"/art")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    // Update the art using artId
    function updateArtById(artId, newArtObj) {
      // var deferred = $q.defer();
      // $http({
      //   method: 'PUT',
      //   url: '/api/project/art/' + artId,
      //   headers: {'Content-Type': undefined},
      //   data: newArtObj,
      //   transformRequest: function (data, headersGetter) {
      //     var formData = new FormData();
      //     angular.forEach(data, function (value, key) {
      //         formData.append(key, value);
      //     });

      //     var headers = headersGetter();
      //     console.log(headers);
      //     delete headers['Content-Type'];

      //     return formData;
      //   }
      // }).success(function(response) {
      //   console.log(response);
      //   deferred.resolve(response);
      // })
      // .error(function(data, status){
      //   deferred.resolve("Failure");
      // });
      // return deferred.promise;
      var deferred = $q.defer();
      $http
      .put("/api/project/art/" + artId, newArtObj)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

    function searchArt(keyword, genreType) {
      var deferred = $q.defer();
      $http
      .get("/api/project/art/search/" + keyword + "/genre/" +genreType)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
  }
})();