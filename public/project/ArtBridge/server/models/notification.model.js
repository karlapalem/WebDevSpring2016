"use strict";

module.exports = function(app, mongoose) {

  var q = require("q");
  var notificationSchema = require("./notification.schema.js")(mongoose);
  var notificationModel = mongoose.model("Notification", notificationSchema);

  var api = {
    createNotification: createNotification,
    getNotificationForUser: getNotificationForUser,
    updateOrderStatus: updateOrderStatus
  }
  return api;

  // Adds notification to db, returns it
  function createNotification(notificationObj) {
    var deffered = q.defer();
    notificationModel.create(notificationObj, function(err, art){
      if(err) {
        console.log("create notification called");
        deffered.reject(err);
      } else {
        deffered.resolve(art);
      }
    });
    return deffered.promise;      
  }

  function getNotificationForUser(orderIds) {
    var deffered = q.defer();
    notificationModel.find({orderId: {$in : orderIds}, status: false}).sort({orderDate: 'desc'}).find(function(err, art){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(art);
      }
    });
    return deffered.promise;  
  }

   function updateOrderStatus(notificationId) {
    var deferred = q.defer();
    notificationModel.findById(notificationId, function(err, notification) {
      if(err) {
        deferred.reject(err);
      } else {
        notification.status = true;
        notification.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }
};