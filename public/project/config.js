
"use strict";

(function () {
    angular
        .module("ArtBridgeApp", ["ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/browse", {
                    templateUrl: "views/browse/browse.view.html",
                    controller: "FormController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController"
                })
                .when("/mywork", {
                    templateUrl: "views/users/mywork.view.html",
                    controller: "MyWorkController"
                })

                .otherwise({
                    redirectTo: "/home"
                });
        });
})();