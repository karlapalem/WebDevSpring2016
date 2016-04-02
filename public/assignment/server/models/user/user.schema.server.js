/**
 * Created by poojitha on 4/1/16.
 */
"use strict"

module.exports = function (mongoose) {

    var userSchema = mongoose.Schema({

        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String]

    }, {collection: 'assignment.user'});

    return userSchema;

}