/**
 * Created by poojitha on 3/4/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function ($routeProvider) {
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/browse", {
                    templateUrl: "views/browse/browse.view.html",
                    controller: "FormController"
                })
                .when("/fields", {
                    templateUrl: "views/browse/fields.view.html",
                    controller: "FieldsController"
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
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();