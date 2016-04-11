module.exports = function(mongoose) {

  var orderSchema = mongoose.Schema({
    "sellerId": String,
    "buyerId" : String,
    "artId": String,
    "location": String,
    "comments": String,
    "status": {type: Boolean, default: false}, // delivered status
    "orderDate": {type: Date, default: Date.now},
    "deliveryTime": Date,
  }, {collection: "cs5610.project.order"});

  return orderSchema;
}