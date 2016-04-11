"use strict";
(function () {

  angular
  .module("ArtApp")
  .controller("EditArtOfferedController", EditArtOfferedController);

  function EditArtOfferedController($routeParams, cfpLoadingBar, $location,
                                    $rootScope, ArtService, $scope, Upload,
                                    $timeout, ngDialog) {
    var model = this;
    var user = $rootScope.user;
    var artId = $routeParams.artId;
    model.update = update;
    var image, resizedImage;
    init()

    function init() {
      // Get cuisines
      cfpLoadingBar.start();
      ArtService.getCuisines().then(function(cuisines) {
        model.cuisines = cuisines;
      });
      if(artId) {
        // if(user._id === art.userId)
        $rootScope.artId = null;
        ArtService.getArtById(artId).then(function(art) {
          if(user._id === art.userId) {
            console.log("trying to edit art" + art);
            model.art = art;
            console.log(model.art.cuisine);
          } else {
            ngDialog.open({
              template: 'views/Dialog/wentWrong.dialog.view.html',
            });
            $location.url("/artOffered");
          }
        });
      } else {
        ngDialog.open({
          template: 'views/Dialog/wentWrong.dialog.view.html',
        });
        $location.url("/login");
      }
      cfpLoadingBar.complete();
    }

    function update(newArtObj) {
      if(image != undefined && resizedImage != undefined) {
        newArtObj.image = resizedImage;
        ArtService.updateArtById(artId, newArtObj).then(function(updatedArt) {
          $rootScope.artId = null;
          ngDialog.open({
            template: 'views/Dialog/update.dialog.view.html',
          });
          $location.url("/artOffered");
        });
      } else {
        ngDialog.open({
          template: 'views/Dialog/uploadImage.dialog.view.html',
        });
      }
    }

    function home() {
      $rootScope.artId = null;
      $location.url("/art");
    }

    // To capture the image
    $scope.imageChanged = ImageChanged
    function ImageChanged(element){
      var fileDisplayArea = document.getElementById('display');
      image = undefined;
      fileDisplayArea.innerHTML = "";

      if(element.files[0] == undefined || element.files[0] == null)
        return;

      var name = element.files[0].name;

      if(name.length <= 4)
        alert("The input is invalid");
      else{
        var extension = name.substring(name.length -3, name.length).toLowerCase()
        if(extension != "jpg" && extension != 'png')
          ngDialog.open({
          template: 'views/Dialog/uploadImage.dialog.view.html',
        });
        else {
          var file = element.files[0];
          var reader = new FileReader();

          reader.onload = function(e) {
            var img = new Image(600,400);
            image = reader.result;
            img.src = image;
            img.className = "big-icon";
            fileDisplayArea.appendChild(img);
            resizedImage = imageToDataUri(img, 600, 400);
          }
          reader.readAsDataURL(file);
        }
      }
    }


    // To resize the image
    function imageToDataUri(img, width, height) {

      // create an off-screen canvas
      var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

      // set its dimension to target size
      canvas.width = width;
      canvas.height = height;

      // draw source image into the off-screen canvas:
      ctx.drawImage(img, 0, 0, width, height);

      // encode image to data-uri with base64 version of compressed image
      return canvas.toDataURL();
    }
     
  }
})();