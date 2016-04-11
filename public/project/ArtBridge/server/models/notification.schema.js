module.exports = function(mongoose) {

  var notificationSchema = mongoose.Schema({
    "artId": String,
    "orderId" : String,
    "user": String,
    "userInfo": String,
    "title": String,
    "cost": Number,
    "comments": {type: String, default: 'no comments'},
    "orderDate": {type: Date, default: Date.now},
    "status": {type: Boolean, default: false}
  }, {collection: "cs5610.project.notification"});

  return notificationSchema;
}