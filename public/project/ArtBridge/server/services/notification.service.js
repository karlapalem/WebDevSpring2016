module.exports = function(app, auth, userModel, notificationModel, orderModel) {

  app.get("/api/project/user/:userId/notification", auth, getNotificationForUser);
  app.put("/api/project/user/:notificationId/deliveredArt/:orderId", auth, deliverArt);

  function getNotificationForUser(req, res) {
    userModel.findUserById(req.params.userId).then(function(user) {
      notificationModel.getNotificationForUser(user.sales).then(function(notifications) {
        res.json(notifications);  
      })
    });
  }

  function deliverArt(req, res) {
    orderModel.updateOrderStatus(req.params.orderId).then(function(order) {
      notificationModel.updateOrderStatus(req.params.notificationId).then(function(notifications) {
        res.json(notifications);
      })
    })
  }
 
};