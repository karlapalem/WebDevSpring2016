module.exports = function(mongoose) {
  
  var userSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "username": String,
    "password": String,
    "gender": String,
    "email": String,
    "rating": {type: Number, max: 5, default: 1},
    "address": String,
    "googleId": String,
    "image": String,
    // Art sold stores order ID
    "sales": [String],
    // Order 
    "orders": [String],
    // List of items he is willing to sell
    "artOffered": [String]
  }, {collection: "cs5610.project.user"});

  return userSchema;
}