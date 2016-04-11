module.exports = function(mongoose) {

  var artOfferedSchema = mongoose.Schema({
    "userName": String,
    "artId": String,
    "artName": String,
    "artType": String,
    "artCuisine": String,
    "orderDate": Date,
    "alreadyDelivered": Boolean
  });

  return artOfferedSchema;
}