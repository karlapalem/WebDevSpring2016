/**
 * Created by poojitha on 3/4/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(UserService, $location) {

        var vm = this;

        function init() {

            vm.$location = $location;
        }
        init();
    }
})();