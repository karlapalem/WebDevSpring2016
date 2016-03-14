(function(){
    angular
        .module("MovieApp")
        .factory("MovieService", movieService);

    function movieService($http) {

        var api = {
            findMovieByTitle: findMovieByTitle,
            findMovieByImdbID: findMovieByImdbID
        };
        return api;

        function findMovieByTitle(title, callback) {
            $http.get("https://api.artsy.net/api/browse?q="+title+"?access_token=JvTPWe4WsQO-xqX6Bts49nhaZVHJVAa0b4HVwAYFbKItQURliF1cGoe6_EwQQrfZadojL4nPct5PeAelOAmuC0F3GWLICeMWtmWZV4AmJJVA391KHrrWZdFk_XEX9VKv-o0_VL6EKmVzdd2eFijMC2KjRnl9_M7n-e3YGsdbjcyBd64hvl7k2CB_vHq6lyPDigixaTQ03t0q3Xbu5nWTQgiJJytrWu8eGpqsahM4JOU=")

                .success(callback);
        }

        function findMovieByImdbID(imdbID, callback) {
            $http.get("http://www.omdbapi.com/?i="+imdbID)
                .success(callback);
        }

    }
})();
