"use strict";

module.exports = function(app, mongoose) {

  var q = require("q");
  var artSchema = require("./art.schema.js")(mongoose);
  var artModel = mongoose.model("Art", artSchema);

  var api = {
    getCuisine: getCuisine,
    addArt: addArt,
    getArtOfferedByUser: getArtOfferedByUser,
    getArtById: getArtById,
    deleteArtById: deleteArtById,
    // Edit artOffered
    updateArtById: updateArtById,
    // Order art
    updateQuantity: updateQuantity, // Used in BuyController
    getArtWithIds:getArtWithIds,
    // Home page
    getAvailableArtItems: getAvailableArtItems,
    getAvailableArtItemsForUser: getAvailableArtItemsForUser,
    // Search page
    searchArt: searchArt,
    searchArtByCuisineType: searchArtByCuisineType,
    searchArtByKeyWordOrCuisine: searchArtByKeyWordOrCuisine
  }
  return api;

  // Returns all the cuisine 
  function getCuisine() {
    var deffered = q.defer();
    deffered.resolve(artModel.schema.path('cuisine').enumValues);
    return deffered.promise;
  }

  // Adds artItem to db, returns it
  function addArt(userId, newArtObj) {
    var deffered = q.defer();
    newArtObj.userId = userId;
    artModel.create(newArtObj, function(err, art){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(art);
      }
    });
    return deffered.promise;      
  }

  // Takes userId and returns all the artItems offered
  // by the user
  function getArtOfferedByUser(userId) {
    var deffered = q.defer();
    artModel.find({userId: userId}).sort({addedOn: -1}).find(function(err, art){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(art);
      }
    });
    return deffered.promise;  
  }

  function getArtById(artId) {
    var deffered = q.defer();
    artModel.findById(artId, function(err, art){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(art);
      }
    });
    return deffered.promise;  
  }

  function deleteArtById(artId) {
    var deffered = q.defer();
    artModel.remove({_id: artId}, function(err, art){
      if(err) {
        console.log("Deleted artwork" +  art);;
        deffered.reject(err);
      } else {
        deffered.resolve(art);
      }
    });
    return deffered.promise;  
  }

  function updateArtById(artId, newArtObj) {
    var deferred = q.defer();
    delete newArtObj._id;
    artModel.update({_id: artId}, {$set: newArtObj}, function(err, result) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  }

  // Used by orderArt to reduce the quantity of art
  function updateQuantity(artId) {
    var deferred = q.defer();
    artModel.findById(artId, function(err, art) {
      if(err) {
        deferred.reject(err);
      } else {
        art.quantity = art.quantity - 1;
        art.save(function(error, result) {
          deferred.resolve(result);
        });
      }
    });
    return deferred.promise;
  }

  function getAvailableArtItems() {
    var deferred = q.defer();
    artModel.find({quantity: {$gt: 0}}).sort({addedOn: -1}).find(function(err, artItems) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(artItems);
      }
    });
    return deferred.promise;
  }

  function getAvailableArtItemsForUser(userId) {
    var deferred = q.defer();
    artModel.find({$and: [{userId: {$ne: userId}}, {quantity: {$gt: 0}}]}).sort({addedOn: -1}).find(function(err, artItems) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(artItems);
      }
    });
    return deferred.promise;
  }

  function getArtWithIds(arrayIds) {
    var deffered = q.defer();
    artModel.find({_id: {$in : arrayIds}}).sort({addedOn: -1}).find(function(err, art){
      if(err) {
        deffered.reject(err);
      } else {
        deffered.resolve(art);
      }
    });
    return deffered.promise;  
  }

  function searchArt(keyword) {
    console.log("Search by keyword " + keyword);
    var deferred = q.defer();
    artModel.find({quantity: {$gt: 0}})
              .find({$or: [ {title: {$regex: keyword, $options: "i"}}, 
                            {description: {$regex: keyword, $options: "i"} }
                          ]})
              .sort({addedOn: -1})
              .find(function(err, artItems) {
                if(err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(artItems);
                }
              });
    return deferred.promise;
  }

  function searchArtByCuisineType(cuisineType) {
    console.log("Search by genre " +cuisineType);
    var deferred = q.defer();
    artModel.find({quantity: {$gt: 0}})
              .find({cuisine: cuisineType})
              .sort({addedOn: -1})
              .find(function(err, artItems) {
                if(err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(artItems);
                }
              });
    return deferred.promise;
  }

  function searchArtByKeyWordOrCuisine(keyword, cuisineType) {
    console.log("Search by genre " +cuisineType + " keyword " + keyword);
    var deferred = q.defer();
    artModel.find({quantity: {$gt: 0}})
              .find({$or: [ {title: {$regex: keyword, $options: "i"}}, 
                            {description: {$regex: keyword, $options: "i"}},
                            {cuisine: cuisineType}
                          ]})
              .sort({addedOn: -1})
              .find(function(err, artItems) {
                if(err) {
                  deferred.reject(err);
                } else {
                  deferred.resolve(artItems);
                }
              });
    return deferred.promise;
  }

}