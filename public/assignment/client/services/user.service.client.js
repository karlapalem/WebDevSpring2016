/**
 * Created by poojitha on 3/4/16.
 */
"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {

        /*        var users = [];
         users = [
         {"_id":123, "firstName":"Alice", "lastName":"Wonderland",
         "username":"alice", "password":"alice", "roles": ["student"]},
         {"_id":234, "firstName":"Bob", "lastName":"Hope",
         "username":"bob", "password":"bob", "roles": ["admin"]},
         {"_id":345, "firstName":"Charlie", "lastName":"Brown",
         "username":"charlie","password":"charlie", "roles": ["faculty"]},
         {"_id":456, "firstName":"Dan", "lastName":"Craig",
         "username":"dan", "password":"dan", "roles": ["faculty", "admin"]},
         {"_id":567, "firstName":"Edward", "lastName":"Norton",
         "username":"ed", "password":"ed", "roles": ["student"]}
         ];*/

        var api = {

            users: [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["student"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["faculty"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["student"]
                }
            ],

            findUsersByCredentials: findUsersByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        function findUsersByCredentials(username, password, callback) {
            var user = null;
            for (var i = 0; i < api.users.length; i++) {
                if (api.users[i].username === username && api.users[i].password === password) {
                    user = api.users[i];
                    break;
                }
            }
            callback(user);
        }

        function findAllUsers(callback) {
            callback(api.users);
        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            api.users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {
            for (var i = 0; i < api.users.length; i++) {
                if (api.users[i]._id === userId) {
                    api.users.splice(i, 1);
                    break;
                }
            }
            callback(api.users);
        }

        function updateUser(userId, user, callback) {
            for (var i = 0; i < api.users.length; i++) {
                if (api.users[i]._id === userId) {
                    api.users[i] = user;
                    callback(api.users[i]);
                    break;
                }
            }
        }
    }
})();