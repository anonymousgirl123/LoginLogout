var express = require('express');
var router = express.Router();
var signup = require('./signup');
var login = require('./login');
var middlewares = require('../../middlewares');
/* GET home page. */
/*var authenticate = function (req, res, next){
	if(req.session.name==undefined){
		console.log("user signed out");

		res.render('login', {title : "please log in into your account"});
	}
	next();
}*/
router.get('/', function(req, res, next) {
	console.log("Welcome to LS");
  res.render('index', { title: 'Welcome to LS' });

});
router.get('/list', middlewares.authenticate, signup.abc);
router.get('/destroy', signup.xyz);
router.get('/signup', signup.first);
router.post('/admin_function', signup.second);
router.get('/login', login.first);
router.post('/admin_login', login.second);
module.exports = router;
