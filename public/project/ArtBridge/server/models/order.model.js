"use strict";

module.exports = function(app, mongoose) {

  var q = require("q");
  var orderSchema = require("./order.schema.js")(mongoose);
  var orderModel = mongoose.model("Order", orderSchema);

  var api = {
    createOrder: createOrder,
    getOrderForUser: getOrderForUser,
    updateOrderStatus: updateOrderStatus
  }
  return api;

  // Insert order information into Order
  function createOrder(order) {
    var deffered = q.defer();
    orderModel.create(order, function(err, order){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(order);
      }
    });
    return deffered.promise;      
  }

  // Get all the order placed by the user - check buyerId
  function getOrderForUser(userId) {
     var deffered = q.defer();
    orderModel.find({buyerId: userId}).sort({orderDate: -1}).find(function(err, orders){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(orders);
      }
    });
    return deffered.promise;      
  }

  function updateOrderStatus(orderId) {
    var deferred = q.defer();
    orderModel.findById(orderId, function(err, order) {
      if(err) {
        deferred.reject(err);
      } else {
        order.status = true;
        order.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }
}