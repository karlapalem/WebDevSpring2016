var express       = require('express');
var app           = express();

var bodyParser    = require('body-parser');
var multer        = require('multer');
var uuid          = require('node-uuid');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

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

//app.use(session({ secret: "any_string" }));

app.use(cookieParser());


require("./public/assignment/server/app.js")(app, uuid);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress, function () {
    console.log("Server is listening on: " + ipaddress + ":" + port);
});