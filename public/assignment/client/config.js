"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {

                templateUrl: "views/home/home.view.html",

                controller: "HomeController",

                controllerAs: "model"
            })
            .when("/login", {

                templateUrl: "views/login/login.view.html",

                controller: "LoginController",

                controllerAs: "model"
            })
            .when("/profile", {

                templateUrl: "views/profile/profile.view.html",

                controller: "ProfileController",

                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/register", {

                templateUrl: "views/register/register.view.html",

                controller: "RegisterController",

                controllerAs: "model"
            })
            .when("/admin", {

                templateUrl: "views/admin/admin.view.html",

                controller: "AdminController",

                controllerAs: "model"
            })
            .when("/forms", {

                templateUrl: "views/forms/forms.view.html",

                controller: "FormsController",

                controllerAs: "model",

                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {

                templateUrl: "views/forms/fields.view.html",

                controller: "FieldsController",

                controllerAs: "model",

                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({

                redirectTo: "/home"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;

            if (currentUser) {

                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {

                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    }
})();