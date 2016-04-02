/**
 * Created by poojitha on 4/1/16.
 */
"use strict";

module.exports = function (mongoose) {

    var fieldSchema = require("./field.schema.server.js")(mongoose);

    var formSchema = mongoose.Schema({

        userId: String,
        title: String,
        fields: [fieldSchema],
        created: Date,
        updated: Date
    }, {collection: "assignment.form"});

    return formSchema;
}