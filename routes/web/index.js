//import { resolve } from 'dns';

var express = require('express');
var router = express.Router();
var signup = require('./signup');
var login = require('./login');
var MyModel = require("../../models/selectedModel")
var middlewares = require('../../middlewares');
var TwitterModel = require('../../models/twitter');
var User = require('../../models/user');
var Twit = require('twit');
var Promise = require('promise');
var mongoose = require('mongoose');

var T = new Twit({
  consumer_key:         'sJF8ahoZAv1QcKeuo7EKS8rtG',
  consumer_secret:      '8oBuyqJDap967v2tyjZ6eNBCBbKoPEQFdfLQDosOqjoH0fBm2s',
  access_token:         '828519458746560512-jy2Eh05mDHyl91tuRP0SynR9VUfo4Gl',
  access_token_secret:  'olB0nuk3Ec3gb2v6J3mCRGu6Ga7Pk2TDF6EPZb1xBqOaG',
 // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

//user login

router.post('/login', function(req, res){
  console.log("req.body", req.body);
  var data = {
    displayName: req.body.displayName,
    uid: req.body.uid,
    email: req.body.email,
    photoURL: req.body.photoURL,
    accessToken: req.body.accessToken,
    phoneNumber: req.body.phoneNumber
  }
  console.log("var data", data);

  var newUser = new User(data);
  User.find({uid: data.uid})
  .then((data)=>{console.log("data found::", data);
    if(data.length==0){console.log("saving...")
      newUser.save()
      .then((result) => {
        console.log("logged in user saved::", result._id);
        //localStorage.setItem("uid", result._id)
        res.send({response: result, statusCode: 200})
        
      })
      .catch((err) => {console.log("err", err)
        res.send({response: err, statusCode: 500})
      })
    }
    else{
      console.log("inside else::");
      console.log("user alreadyObjectID present ...");
    }
  })
  .catch((err) => {console.log("err::", err)})
})


//getting the list of twitter feeds {query: IndianSportFan}
router.get('/getTwitterFeed', function(req, res){
  let list = [];
  new Promise((resolve, reject) => {
    T.get('search/tweets', { q: 'IndianSportFan', count: 20 }, function(err, data, response) {
      console.log("fetching tweets", data);
      list  = data.statuses;
      
      res.send({response: list, statusCode: 200});
      resolve(data);
    })
  })
})

//post to save all the tweets at once


//post request to save tweets of the user logged in

router.post("/saveTweets", function(req, res){
  var data = req.body;
  
  console.log("data::", data);
  var twitter_feed = new TwitterModel(data);
  twitter_feed.save()
  .then((result) => {
    console.log("ress::", result);
    res.send({response: result, statusCode:200})
  })
  .catch((err) => {
    console.log("err...", err);
    res.send({response: err, statusCode: 500})})
});

//



//update views, likes, dislikes

router.post("/updateTwitterFeed", function(req, res){
  var data = req.body;
  // {
  //   likes: 'yes',
  //   dislikes: 'no'
  //    feed_id: 'gewyfg'
  //    
  // }
  console.log("/likes", data)
  TwitterModel.findOne({_id: data.feed_id})
  .then((result) => {
    console.log("result", result);
    if(data.likes === 'yes'){
      result.likes = result.likes+1;
    }
    if(data.dislikes === 'yes'){
      result.dislikes = result.dislikes+1;
    }
    result.save()
    .then((twitter) => {
      console.log("twitter", twitter); 
      res.send({response: result, statusCode: 200})
    })
    .catch((err) => {
      res.send({response: err, statusCode: 500})
    })

  })
  .catch((err) => {
    console.log("err::", err);
  })
});

//find all users in the db

router.get("/allUsers", function(req, res){
  User.find({}).skip(5)
  .then((result) => {console.log("all users::", result);res.send({response: result})})
  .catch((err) => {console.log("err...", err)})
})

//find userdetails along with tweets

router.get("/getUserTweets/:userid", function(req, res){
  console.log("req.params::", typeof req.params.userid);
  TwitterModel.find({uid: req.params.userid})
  .populate('uid')
  .exec(function(err, result){
    if(err){
      res.send({response: err, statusCode: 500})
    }
    else{
      res.send({response: result, statusCode: 200})
    }
  })
  
})

// T.get('search/tweets', function(err, data, response) {
//   console.log("fetching tweets", data)
// })

/* GET home page. */
/*var authenticate = function (req, res, next){
	if(req.session.name==undefined){
		console.log("user signed out");

		res.render('login', {title : "please log in into your account"});
	}
	next();
}*/
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Welcome toupVoteTweet HOME PAGE' });

});
router.post('/setModel', function(req, res){
  console.log("req.body", req.body.model);
  var newModel = new MyModel(req.body);
  newModel.save()
  .then(data => {
    console.log("data", data);
    res.json({response: data, status: 200})
  })
  .catch(err => {
    console.log("err", err);
    res.json({error: err, status: 404})
  })
});

router.get('/getModel', function(req, res){
  MyModel.find({})
  .then(data => {
    console.log("data", data, data[data.length-1]);
    res.json({response: data[data.length-1], status: 200})
  })
  .catch( err => {
    console.log("err", err);
    res.json({error: err, status: 404})
  })
});

//save the entire data in database

router.post('/setAllTwitterList', function(req, res){
  var newModel = new TwitterModel(req.body.data);
  newModel.save()
  .then(data => {
    console.log("data saved", data);
    res.json({response: data, status: 200})
  })
  .catch((err) => {
    console.log("err", err);
    res.send({response: err, status: 500});
  })
});

//fetching tweets by id
router.get('/twitter/:id', function(req, res){
  TwitterModel.findOne({feed_id: req.params.id})
  .then((data) => {
    res.send({response: data, status: 200})
  })
  .catch((err => {
    res.send({response: err, status: 500})
    console.log("err::", err);
  }))
})
//fetching 5 tweets at once
router.get('/twitterPagination/:uid', function(req, res){
  TwitterModel.find({uid: req.params.uid}).skip(5)
  .then((data) => {
    res.send({response: data, status: 200})
  })
  .catch((err => {
    res.send({response: err, status: 500})
    console.log("err::", err);
  }))
})

router.get('/list', middlewares.authenticate, signup.abc);
router.get('/destroy', signup.xyz);
router.get('/signup', signup.first);
router.get('/user_info', signup.view);
router.post('/admin_function', signup.second);
//router.get('/login', login.first);
router.post('/admin_login', login.second);
module.exports = router;
