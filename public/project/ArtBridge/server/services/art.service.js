module.exports = function(app, auth, artModel, userModel, multipart) {

  app.post("/api/project/user/:userId/art", auth, addArt);
  app.get("/api/project/art/cuisine", getCuisine);
  app.post("/api/project/user/:userId/artOffered", auth, getArtOfferedByUser);
  app.get("/api/project/art/:artId", auth, getArtById);
  app.delete("/api/project/art/:artId", auth, deleteArtById);
  // EditArtOffered - update art
  app.put("/api/project/art/:artId", auth, updateArtById);
  // Home page
  app.get("/api/project/art", getAvailableArtItems);
  app.get("/api/project/user/:userId/art", getAvailableArtItemsForUser);
  // Search page
  app.get("/api/project/art/search/:keyword/cuisine/:cuisineType", searchArt);
  
  // Adds artItem to db and returns all the artItems for given userId
  // 1) Update art table
  // 2) Update artOffered array of user
  function addArt(req, res) {
    var artObj = req.body;
    // artObj.image = req.files.image.path.replace("public\\project\\uploads\\", "");
    console.log("Trying to add art");
    artModel.addArt(req.params.userId, artObj).then(function(newlyAddedArt) {
      console.log("Added art obj");
      userModel.updateArtOfferedByUser(req.params.userId, newlyAddedArt._id).then(function(updatedUser) {
        res.json(updatedUser);
      });
    });
  }

  function getCuisine(req, res) {
    artModel.getCuisine().then(function(cuisines) {
      res.json(cuisines);
    });
  }

  function getArtOfferedByUser(req, res) {
    artModel.getArtOfferedByUser(req.params.userId).then(function(artItemsOfferedByUser) {
      res.json(artItemsOfferedByUser);
    });
  }

  function getArtById(req, res) {
    artModel.getArtById(req.params.artId).then(function(art) {
      res.json(art);
    });
  }

  function deleteArtById(req, res) {
    artModel.deleteArtById(req.params.artId).then(function(art) {
      res.json(art);
    });
  }

  function updateArtById(req, res) {
    var artObj = req.body;
    // console.log(req.files);
    // artObj.image = req.files.image.path.replace("public\\project\\uploads\\", "");
    artModel.updateArtById(req.params.artId, artObj).then(function(art) {
      res.json(art);
    });
  }

  function getAvailableArtItems(req, res) {
    artModel.getAvailableArtItems().then(function(artItems) {
      res.json(artItems);
    });
  }

  function getAvailableArtItemsForUser(req, res) {
    artModel.getAvailableArtItemsForUser(req.params.userId).then(function(artItems) {
      res.json(artItems);
    });
  }
 
  function searchArt(req, res) {
    console.log("Searching for this " +req.params.keyword);
    var keyword = req.params.keyword;
    var cuisineType = req.params.cuisineType;
    if(keyword == "emptyKeyword" && cuisineType != "undefined") {
      artModel.searchArtByCuisineType(cuisineType).then(function(artItems) {
        res.json(artItems);
      });
    } else if(keyword != "emptyKeyword" && cuisineType == "undefined") {
      artModel.searchArt(keyword).then(function(artItems) {
        res.json(artItems);
      });
    } else if(keyword != "emptyKeyword" && cuisineType != "undefined") {
      artModel.searchArtByKeyWordOrCuisine(keyword, cuisineType).then(function(artItems) {
        res.json(artItems);
      });
    }
  }
};