"use strict";
var mongoose = require('mongoose');
var User = require("./user");
var userType = mongoose.Schema({

    


})

var twitterModel = mongoose.Schema({
//	model     :   {type : String, unique : false, required : true}
    uid: {type: mongoose.Schema.ObjectId, ref: 'User' },//must be of the type ObjectId else .populate() won't work
    created_at: {type:String , default: ''},
    user_id: {type: String, default: ''},
    user_name: {type: String, default: ''},
    profile_image_url : {type: String, default: ''},
    feed_title: {type: String, default:''},
    feed_description: {type: String, default:''},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    feed_id: {type: Number, default: null},
    view_count: {type: Number, default: 0}
});


   module.exports = mongoose.model('twitter', twitterModel);
