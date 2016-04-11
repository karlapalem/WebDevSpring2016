(function() {
  "use strict";
  
  angular
    .module("ArtApp")
    .config(Configure);

  function Configure($routeProvider, cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
    // Stripe.setPublishableKey('pk_test_E0oNL29chPrz1RqTKP73fGP2');
    $routeProvider
      .when("/art", {
            templateUrl: "views/art/art.view.html",
            controller: "ArtController",
            controllerAs: "model"
      })
      .when("/profile", {
            templateUrl: "views/profile/profile.view.html",
            controller: "ProfileController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/search", {
            templateUrl: "views/search/search.view.html",
            controller: "SearchController",
            controllerAs: "model"
      })
      .when("/seller", {
            templateUrl: "views/seller/seller.view.html",
            controller: "SellerController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/notification", {
            templateUrl: "views/notification/notification.view.html",
            controller: "NotificationController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/buy/:artId", {
            templateUrl: "views/buyer/buyer.view.html",
            controller: "BuyerController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/register", {
            templateUrl: "views/register/register.view.html",
            controller: "RegisterController",
            controllerAs: "model"
      })
      .when("/order", {
            templateUrl: "views/order/order.view.html",
            controller: "OrderController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/login", {
            templateUrl: "views/login/login.view.html",
            controller: "LoginController",
            controllerAs: "model"
      })
      .when("/artOffered", {
            templateUrl: "views/artOffered/artOffered.view.html",
            controller: "ArtOfferedController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .when("/editArtOffered/:artId", {
            templateUrl: "views/artOffered/editArtOffered.view.html",
            controller: "EditArtOfferedController",
            controllerAs: "model",
            resolve : {
                 loggedin: loggedin
            }
      })
      .otherwise({
        redirectTo: "/art"
      });
  }

  function loggedin ($rootScope, $location, UserService, ngDialog) {
    UserService.loggedin().then(function(user){
        if (user !== '0') {
          $rootScope.user = user;
        } else {
          ngDialog.open({
            template: 'views/Dialog/login.dialog.view.html',
          })
          $location.url('/login');
        }
    }, function(err){
        ngDialog.open({
          template: 'views/Dialog/wentWrong.dialog.view.html',
        })
        $location.url('/login');
    });
  }

})();