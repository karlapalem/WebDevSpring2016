(function () {
  "use strict";

  angular
  .module("ArtApp")
  .controller("BuyerController", BuyerController)
  .directive('googlePlaces', function(){
    return {
      restrict:'E',
      replace:true,
      // transclude:true,
      scope: {location:'='},
      template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level"/>',
      link: function($scope, elm, attrs){
        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
          $scope.$apply();
        });
      }
    }
  });

  function BuyerController($scope, $routeParams, $location, $rootScope, ArtService, PaymentService, ngDialog) {
    var model = this;
    // model.orderArt = orderArt;
    model.home = home;    
    // model.saveCustomer = saveCustomer;
    // model.payForArt = payForArt;
    model.doCheckout = doCheckout;

    var user = $rootScope.user;
    var artId = $routeParams.artId;
    
    init();
    function init() {
      model.art = {};
      $routeParams.artId = {};
      ArtService.getArtById(artId).then(function(art) {
        ngDialog.open({
          template: 'views/Dialog/orderArt.dialog.view.html',
        });
        console.log(art);
        model.art = art;
      });
    }
    
    function doCheckout(token) {
      // Create an order
      if($scope.location != undefined && $scope.location != "") {
        var order = { sellerId: model.art.userId, buyerId: user._id, artId: model.art._id, location: $scope.location,
                      comments: model.art.comments, cost: model.art.cost} ;
        if(order.sellerId === order.buyerId) {
          ngDialog.open({
            template: 'views/Dialog/orderOwnArt.dialog.view.html',
          });
        } else {
          ngDialog.open({
            template: 'views/Dialog/wait.dialog.view.html',
          });
          PaymentService.payForArt(token, order).then(function(response) {
            if(response == "Failure") {
              ngDialog.open({
                template: 'views/Dialog/wentWrong.dialog.view.html',
              });
            } else {
              ngDialog.open({
                template: 'views/Dialog/orderSuccess.dialog.view.html',
              });
              $location.url("/order");
            }
          });
        }
      } else {
        ngDialog.open({
          template: 'views/Dialog/enterAddress.dialog.view.html',
        });
      }

    };

    function home() {
      $location.url("/art");
    }
    
    $scope.location = '';

    $scope.doSearch = function(){
      if($scope.location === ''){
        alert('Directive did not update the location property in parent controller.');
      } else {
        alert('Yay. Location: ' + $scope.location);
      }
    };
  }
})();