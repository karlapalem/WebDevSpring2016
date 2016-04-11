(function () {
  "use strict";
  
  angular
    .module("ArtApp")
    .controller("SearchController", SearchController);

  function SearchController($location, cfpLoadingBar, ArtService, ngDialog, $rootScope) {
    var model = this;
    model.searchArt = searchArt;
    model.artItems = null;
    model.artDetails = artDetails;

    getCuisines();   
    function getCuisines() {
      ArtService.getCuisines().then(function(cuisines) {
        model.cuisines = cuisines;
      });
    }

    function searchArt(keyword, cuisineType) {
      cfpLoadingBar.start();
      console.log(cuisineType);
      console.log(keyword);
      if(keyword == undefined && cuisineType == undefined) {
        ngDialog.open({
          template: 'views/Dialog/searchArt.dialog.view.html',
        });
      } else {
        if(keyword == undefined || keyword == "") {
          keyword = "emptyKeyword";
        }
        ArtService.searchArt(keyword, cuisineType).then(function (artItems) {
          console.log(artItems);
          model.artItems = artItems;
        });
      }
      cfpLoadingBar.complete();
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

    model.predicate = 'orderDate';
    model.reverse = true;
    model.sort = function(predicate) {
      model.reverse = (model.predicate === predicate) ? !model.reverse : false;
      model.predicate = predicate;
    };
  }
})();