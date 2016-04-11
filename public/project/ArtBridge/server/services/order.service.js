module.exports = function(app, auth, orderModel, userModel, artModel) {
  app.get("/api/project/user/:userId/orders", auth, getArtOrderedByUser);
 

  // Get all the orders made by user, extract artId then
  // get all the art objs with those ids
  function getArtOrderedByUser(req, res) {
    orderModel.getOrderForUser(req.params.userId).then(function(orderItems) {
      // Get art Items with given artId
      var artId = [];
      for(var i in orderItems) {
        artId.push(orderItems[i].artId);
      };

      var orderedArtItems = [];
      artModel.getArtWithIds(artId).then(function(artItems) {
        for(var j in orderItems) {
          for(var k in artItems) {
            if(orderItems[j].artId === artItems[k].id) {
              var orderedItem = {
                "cost" : artItems[k].cost,
                "title": artItems[k].title,
                "description": artItems[k].description,
                "orderDate": orderItems[j].orderDate,
                "image": artItems[k].image,
                "cuisine": artItems[k].cuisine
              }
              orderedArtItems.push(orderedItem);
            }
          }
        }
        res.json(orderedArtItems);
      });
    });
  }
};