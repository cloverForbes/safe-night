'use strict'

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const userSchema = new Schema({
    type       : {
        type : String,
        default : 'user'
    },
    firstName : String,
    lastName  : String,
    email      : {
        type   : String,
        unique : true
    },
    password   : String,
    birthday   : String,
    lineOne    : String,
    lineTwo    : String,
    city       : String,
    state      : String,
    zip        : String,
    phoneNumber: String,
    gender     : String,
    preffered  : String,
    alerts     : Array,
    isHomeless : {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('User', userSchema);
