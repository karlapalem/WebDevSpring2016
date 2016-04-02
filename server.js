#!/bin/env node
var express       = require('express');
var app           = express();

var bodyParser    = require('body-parser');
var multer        = require('multer');
var uuid          = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/form_app';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {

    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(multer());

app.use(session({
    resave: true,
    saveUninitialized: true,
    //secret: process.env.PASSPORT_SECRET
    secret: "any_string"
}));

app.use(cookieParser());

var assignmentApp = require("./public/assignment/server/app.js")(app, db, mongoose, uuid);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress, function () {
    console.log("Server is listening on: " + ipaddress + ":" + port);
});
