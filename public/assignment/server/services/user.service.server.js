"use strict"

module.exports = function(app, userModel, uuid) {

    //creates a new user embedded in the body of the request, and responds with an array of all users
    app.post("/api/assignment/user", createUser);

    //Return logged in user (possibly null)
    app.get("/api/assignment/user/loggedin", loggedIn);

    //Logout current user
    app.post("/api/assignment/user/logout", logout);

    //responds with an array of all users
    app.get("/api/assignment/user", findAllusers);

    //responds with a single user whose id property is equal to the id path parameter
    app.get("/api/assignment/user/:id", findUserById);

    //updates an existing user whose id property is equal to the id path parameter.
    // The new properties are set to the values in the user object embedded in the HTTP request.
    // Responds with an array of all users
    app.put("/api/assignment/user/:id", updateUserById);

    //removes an existing user whose id property is equal to the id path parameter. Responds with an array of all users
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser (req, res) {

        var user = req.body;

        user._id = parseInt(uuid.v4());

        req.session.currentUser = user;

        res.send(userModel.createUser(user));
    }

    function findAllusers (req, res) {

        if(req.query.username && req.query.password) {

            findUserByCredentials(req, res);

        }else if (req.query.username) {

            findUserByUsername(req, res);

        }else {

            res.json(userModel.findAllUsers());
        }
    }

    function findUserById(req, res) {

        var userId = parseInt(req.params.id);

        res.json(userModel.findUserById(userId));
    }

    function findUserByUsername(req, res) {

        var username = req.query.username;

        res.json(userModel.findUserByUsername(username));
    }

    function findUserByCredentials(req, res) {

        var username = req.query.username;
        var password = req.query.password;

        var credentials = {username: username, password: password};

        var currentUser = userModel.findUserByCredentials(credentials);

        req.session.currentUser = currentUser;

        res.json(currentUser);
    }

    function loggedIn(req, res) {

        if(!req.session.currentUser) {
            req.session.currentUser = null;
        }
        res.json(req.session.currentUser);
    }

    function logout(req, res) {

        req.session.destroy();
        res.send(200);
    }

    function updateUserById(req, res) {

        var userId = parseInt(req.params.id);

        var user = req.body;

        userModel.updateUserById(userId, user);
        res.send(200);
    }

    function deleteUserById(req, res) {

        var userId = parseInt(req.params.id);

        userModel.deleteUserById(userId);

        res.send(200);
    }
};