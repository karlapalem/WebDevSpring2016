module.exports = function(mongoose) {

  var artSchema = mongoose.Schema({
    "title" : {type: String, index: true},
    "type": {type: String, enum: ["Canvas", "Paper", "Print", "Digital Copy"], index: true},
    "genre": {type: String, enum: ["Pencil", "Charcoal", "Acrylics", "OilPaints", "Watercolor", "Fabric", "StainedGlass", "Crafts", "Digital", "Other"]},
    "cost": Number,
    "userId": String,
    "description": {type: String, index: true},
    "quantity": {type: Number, default: 1},
    "addedOn": {type: Date, default: Date.now},
    "image": String
  }, {collection: "cs5610.project.food"});

  return artSchema;
}