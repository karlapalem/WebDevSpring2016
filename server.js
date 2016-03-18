var express = require('express');
var http = require('http'); // TODO: Resolve http config issue for project.
//var bodyParser = require('body-parser');
//var multer = require('multer');
var uuid = require('node-uuid'); // Should be var uuid = require('uuid'); Check if needs to be located in service

var app = express();
app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer());

//app.get('/rest/edition/:editionKey', getEditionData);

// For assignments only


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || '3000';

require('./public/assignment/server/app.js')(app);
app.listen(port, ipaddress);