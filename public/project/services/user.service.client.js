
"use strict";

(function () {
    angular
        .module("ArtBridgeApp")
        .factory("UserService", userService);

    function userService() {

        var users = [];
        users = [
            {"_id":123, "firstName":"Andy", "lastName":"Warhol",
                "username":"andy", "password":"andy", "roles": ["artist"]},
            {"_id":234, "firstName":"Vincent", "lastName":"VanGogh",
                "username":"vincent", "password":"vincent", "roles": ["artist"]},
            {"_id":345, "firstName":"Salvador", "lastName":"Dali",
                "username":"salvador","password":"salvador", "roles": ["artist"]},
            {"_id":456, "firstName":"leonardo", "lastName":"DaVinci",
                "username":"leo", "password":"leo", "roles": ["artist", "admin"]},
            {"_id":567, "firstName":"Poojitha", "lastName":"Karlapalem",
                "username":"pooj", "password":"pooj", "roles": ["artist", "admin"]}
        ];

        var api = {
            findUsersByCredentials: findUsersByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUsersByCredentials(username, password, callback) {
            var user = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username === username && users[i].password === password) {
                    user = users[i];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users.splice(i, 1);
                    break;
                }
            }
            callback(users);
        }

        function updateUser(userId, user, callback) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id === userId) {
                    users[i] = user;
                    callback(users[i]);
                    break;
                }
            }
        }
    }
})();