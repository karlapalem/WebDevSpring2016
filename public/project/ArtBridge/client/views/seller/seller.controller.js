"use strict";
(function () {

  angular
  .module("ArtApp")
  .controller("SellerController", SellerController);

  function SellerController($location, $rootScope, $scope, Upload, $timeout, ArtService, ngDialog) {
    var model = this;
    var user = $rootScope.user;

    model.back = back;
    model.addArt = addArt;
    var image, resizedImage;

    getGenres();
   
    function getGenres() {
      ArtService.getGenres().then(function(genres) {
        model.genres = genres;
      });
    }

    function addArt(newArtObj) {
      if(image != undefined && resizedImage != undefined) {
        newArtObj.image = resizedImage;
        ArtService.addArt(user._id, newArtObj).then(updatedLoggedInUser);
      } else {
        ngDialog.open({
          template: 'views/Dialog/uploadImage.dialog.view.html',
        });
      }
    }

    function updatedLoggedInUser(user) {
      if(user != null && user != "Failure") {
        $rootScope.user = user;
        var userId = user._id;
        ngDialog.open({
          template: 'views/Dialog/art.dialog.view.html',
        });
        $location.url("/artOffered");
      } else {
        ngDialog.open({
          template: 'views/Dialog/wentWrong.dialog.view.html',
        });
      }
    }

    function back() {
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