(function () {
  "use strict";
  
  angular
  .module("ArtApp")
  .controller("ArtController", ArtController);

  function ArtController($scope, $location, $rootScope, ArtService, cfpLoadingBar, ngDialog) {
    var model = this;
    model.user = $rootScope.user;
    model.artDetails = artDetails;
    init();

    function init() {
      cfpLoadingBar.start();
      if(model.user) {
        ArtService.getAvailableArtItemsForUser(model.user._id).then(updateAvailableArtItems);
      } else {
        ArtService.getAvailableArtItems().then(updateAvailableArtItems);
      }
      cfpLoadingBar.complete();
    }

    function updateAvailableArtItems(artItems) {
      model.artItems = artItems;
    }

    function artDetails(artId) {
      if($rootScope.user) {
        $location.url("/buy/" + artId);
      } else {
        ngDialog.open({
          template: 'views/Dialog/login.dialog.view.html',
        });
      }
    }
  }
})();