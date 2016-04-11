"use strict";
(function () {
  angular
  .module("ArtApp")
  .controller("OrderController", OrderController);

  function OrderController($scope, $location, $rootScope, OrderService, cfpLoadingBar) {

    // Binding the function declared in View with the function declared
    // in controller
    var model = this;
    var user = $rootScope.user;
    init();

    function init() {
      cfpLoadingBar.start();
      OrderService.getArtOrderedByUserId(user._id).then(function(artItems) {
        console.log("All the art Items");
        // console.log(artItems);
        model.artItems = artItems;
      });
      cfpLoadingBar.complete();
    } 
  }
})();