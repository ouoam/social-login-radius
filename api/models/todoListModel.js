'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    sub: String,
    user_name: String,
    pass: String,
    at_hash: String,
    first: String,
    last: String,
    locale: String,
    picture: String,

    Created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);