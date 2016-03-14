(function(){
    angular
        .module("MovieApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/browse", {
                templateUrl: "search/search.view.html",
                controller: "SearchController"
            })
            .when("/browse/:title", {
                templateUrl: "browse/browse.view.html",
                controller: "SearchController"
            })
            .when("/detail/:imdbID", {
                templateUrl: "browse/detail.view.html",
                controller: "DetailController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
