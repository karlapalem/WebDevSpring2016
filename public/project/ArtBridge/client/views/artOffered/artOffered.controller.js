"use strict";
(function () {
 
  angular
  .module("ArtApp")
  .controller("ArtOfferedController", ArtOfferedController)
  .directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});

  function ArtOfferedController($scope, cfpLoadingBar, $routeParams, $location,
                                $rootScope, ArtService, ngDialog) {
    var model = this;
    var user = $rootScope.user;
    model.deleteArt = deleteArt;
    model.editArt = editArt;
    // View Art Offered
    init();

    function init() {
      cfpLoadingBar.start();
      model.art = {};
      $routeParams.artId = {};
      ArtService.getArtOfferedByUser(user._id).then(function(artItems) {
        model.artItems = artItems;
      });
      cfpLoadingBar.complete();
    }

    function deleteArt(artId) {
      if(artId) {
        ArtService.deleteArtById(artId).then(function(art) {
        ngDialog.open({
            template: 'views/Dialog/artRemoved.dialog.view.html',
        });
        init();
        });
      }
    }

    function editArt(artId) {
      if(artId) {
        $rootScope.artId = artId;
        $location.url("/editArtOffered/" + artId);
      }
    }

    function home() {
      $location.url("/art");
      $routeParams.artId = {};
    }

    function loggedInUser(userObj) {
      if(userObj != null) {
        $rootScope.user = userObj;
        $location.url("/profile");
      }
    }
  }

})();