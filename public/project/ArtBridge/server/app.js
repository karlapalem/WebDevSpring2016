"use strict";

module.exports = function(app, auth, mongoose, nodemailer, passport, localStrategy, multipart, GoogleStrategy) {

  var userModel = require("./models/user.model.js")(app, mongoose);
  var artModel = require("./models/art.model.js")(app, mongoose);
  var orderModel = require("./models/order.model.js")(app, mongoose);
  var notificationModel = require("./models/notification.model.js")(app, mongoose);
  require("./services/user.service.js")(app, auth, userModel, passport, localStrategy, GoogleStrategy);
  require("./services/art.service.js")(app, auth, artModel, userModel, multipart);
  require("./services/order.service.js")(app, auth, orderModel, userModel, artModel);
  require("./services/payment.service.js")(app, auth, nodemailer, orderModel, userModel, artModel, notificationModel);
  require("./services/notification.service.js")(app, auth, userModel, notificationModel, orderModel);
};