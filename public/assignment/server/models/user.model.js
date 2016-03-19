"use strict"

var mock = require("./user.mock.json");

module.exports = function() {
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        updateUserById: updateUserById,
        deleteUserId: deleteUserId,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {

        mock.push(user);

        return mock;
    }

    function findUserById(userId) {

        for (var i in mock) {

            if(mock[i]._id === userId) {

                return mock[i];
            }
        }
        return null;
    }

    function findAllUsers() {

        return mock;
    }

    function updateUserById(userId, user) {

        user._id = userId;

        for (var i in mock) {

            if(mock[i]._id === userId) {

                mock[i] = user;
                break;
            }
        }

        return mock;
    }

    function deleteUserId(userId) {

        for (var i in mock) {

            if (mock[i]._id === userId) {

                mock.splice(i,1);
                break;
            }
        }

        return mock;
    }

    function findUserByUsername(userName) {

        for (var i in mock) {

            if (mock[i].username === userName) {

                return mock[i];
            }
        }

        return null;
    }

    function findUserByCredentials(credentials) {

        var userFound = null;

        for (var i in mock) {

            if (mock[i].username === credentials.username
                && mock[i].password === credentials.password) {
                userFound = mock[i];
                break;
            }
        }

        return userFound;
    }

}