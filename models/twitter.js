"use strict";
var mongoose = require('mongoose');
var User = require("./user");
var userType = mongoose.Schema({
      "pagination_index": {type: Number, Boolean: null},
      "follow_request_sent": {type: Boolean, default: false},
      "profile_use_background_image": {type: String, default: false},
      "default_profile_image": {type: String, default: false},
      "id": {type: Number, default: null}, 
      "verified": {type: Boolean, default: false}, 
      "profile_image_url_https": {type: String, default: ''}, 
      "profile_sidebar_fill_color": {type: String, default: ''}, 
      "profile_text_color": {type: Number, default: null}, 
      "followers_count": {type: Number, default: null}, 
      "protected": {type: Boolean, default: false}, 
      "location": {type: String, default: ''}, 
      "profile_background_color": {type: String, default: ''}, 
      "listed_count": {type: Number, default: null},
      "utc_offset": -{type: Number, default: null},
      "statuses_count": {type: Number, default: null},
      "description": {type: String, default: ''}, 
      "friends_count": {type: Number, default: null},
      "profile_background_image_url_https": {type: String, default: ''}, 
      "profile_link_co//storing data in redux store;lor": {type: String, default: ''},  
      "profile_image_url": {type: String, default: ''},  
      "notifications": {type: Boolean, default: false},
      "geo_enabled": {type: Boolean, default: false}, 
      "profile_banner_url": {type: String, default: ''}, 
      "id_str": {type: Number, default: null}, 
      "profile_background_image_url": {type: String, default: ''}, 
      "screen_name": {type: String, default: ''}, 
      "lang": {type: String, default: ''}, 
      "following": {type: Boolean, default: false}, 
      "profile_background_tile": {type: Boolean, default: false}, 
      "favourites_count": {type: Number, default: null}, 
      "name": {type: String, default: ''}, 
      "url": {type: String, default: ''}, 
      "created_at": {type: String, default: ''}, 
      "contributors_enabled": {type: Boolean, default: false}, 
      "time_zone": {type: String, default: ''}, 
      "profile_sidebar_border_color": {type: String, default: ''}, 
      "default_profile": {type: Boolean, default: false}, 
      "is_translator": {type: Boolean, default: false}
})

var twitterModel = mongoose.Schema({
//	model     :   {type : String, unique : false, required : true}
    user_id: {type: Schema.Types.ObjectId, ref: 'User' },
    user : {
        type: {
            userType
        },

    }
});


   module.exports = mongoose.model('twitter', twitterModel);
