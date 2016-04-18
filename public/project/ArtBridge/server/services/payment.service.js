

module.exports = function(app, auth, nodemailer, orderModel, userModel, artModel, notificationModel) {
  app.post("/api/project/client/payForArt/:tokenId", auth, payForArt);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "poojithaprasaad@gmail.com",
        pass: "cshomeart"
    }
});

  // Takes tokenId and Order obj
  // Insert order information into Order
  // Update orders[] for buyer in User Table
  // Update sales[] for seller in User Table
  // UPdate the art quantity in Art Table
  function payForArt(req, res) {
    var stripe = require("stripe")("sk_test_j2nn9nnXUdn04URnK4M6OGWs");
    var order = req.body;
    var tokenId = req.params.tokenId;
      stripe.charges.create({
        amount: order.cost * 1000,
        currency: "usd",
        source: tokenId, // obtained with Stripe.js
        description: order.sellerId + " " + order.buyerId
      }, function(err, charge) {
          if(err) {
            res.json("Failure");
          } else {
            var buyer, seller;
            orderModel.createOrder(req.body).then(function(order) {
              // Buyer
              userModel.updateOrderInfoForUser(order.buyerId, order._id).then(function(buyer) {
                buyer = buyer;
                userModel.updateSalesInfoForUser(order.sellerId, order._id).then(function(seller) {
                  // Seller
                  seller = seller;
                  artModel.updateQuantity(order.artId).then(function(art) {
                    var notication = {
                      artId: order.artId, orderId: order.id, user: buyer.firstName + " " + buyer.lastName,
                      userInfo: buyer.email, title: art.title, cost: order.cost,
                      comments: order.comments, orderDate: order.orderDate, status : order.status
                    }
                    notificationModel.createNotification(notication).then(function(response) {
                      // sendMailToSeller
                      var subject = "ArtBridge Notification - An order was placed for " + art.title;
                      var content = "An order was placed by " + buyer.firstName + " " + buyer.lastName + ".Email Information: " + buyer.email + ".Delivery address:" + order.location;
                      var salutation = '<p>Regards, <br/> Home Art</p>'
                      var mailOptions = {
                        from: 'Poojitha <poojithaprasaad@gmail.com>',
                        to: seller.email,
                        cc: buyer.email,
                        subject: subject,
                        text: content,
                        html: '<p>An order was placed by ' + buyer.firstName + ' ' + buyer.lastName + '.</p><ul><li>Email Information:' + buyer.email + '</li><li>Delivery address:' + order.location + '</li></ul>' + salutation
                      };
                      
                      transporter.sendMail(mailOptions, function(err, response){
                        if(err){
                          console.log("There was an " + err);
                          res.end("Failure");
                        }else{
                          console.log("****************************Message sent: " + response.message);
                          res.end("Success");
                        }
                      });
                      res.json("Success"); 
                    })
                  })
                });
              });
            });
          }
      });
  }
};
 