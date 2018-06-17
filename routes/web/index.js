var express = require('express');
var router = express.Router();
var signup = require('./signup');
var login = require('./login');
var MyModel = require("../../models/selectedModel")
var middlewares = require('../../middlewares');
var TwitterModel = require('../../models/twitter');
/* GET home page. */
/*var authenticate = function (req, res, next){
	if(req.session.name==undefined){
		console.log("user signed out");

		res.render('login', {title : "please log in into your account"});
	}
	next();
}*/
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Welcome to HOME PAGE' });

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

//fetching 5 tweets at once
router.get('/twitterPagination', function(req, res){
  TwitterModel.find().skip(5)
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
router.get('/login', login.first);
router.post('/admin_login', login.second);
module.exports = router;
