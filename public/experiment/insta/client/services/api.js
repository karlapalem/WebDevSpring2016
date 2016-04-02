angular.module('Instagram')
    .factory('API', function($http) {

      return {
        getFeed: function() {
          //return $http.get('http://instagram-server.herokuapp.com/api/feed');
          return $http.get('http://localhost:3000/api/feed');
        },
        getMediaById: function(id) {
          //return $http.get('http://instagram-server.herokuapp.com/api/media/' + id);
          return $http.get('http://localhost:3000/api/media/' + id);
        },
        likeMedia: function(id) {
          //return $http.post('http://instagram-server.herokuapp.com/api/like', { mediaId: id });
          return $http.post('http://localhost:3000/api/like' , { mediaId: id });
        }
      }

    });