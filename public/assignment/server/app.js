module.exports = function(app, db, mongoose) {

    var assignemntUserModel = require("./models/user/user.model.js")(db, mongoose);

    var formModel = require("./models/form/form.model.js")(db, mongoose);

    var fieldModel = require("./models/form/field.model")(db, mongoose, formModel);

    var userService = require("./services/user.service.server.js")(app, assignemntUserModel);

    var formService = require("./services/form.service.server.js")(app, formModel);

    var fieldService = require("./services/field.service.server.js")(app, fieldModel);
}