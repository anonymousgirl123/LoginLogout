module.exports = {
	authenticate : function (req, res, next){
	if(req.session.name==undefined){
		console.log("user signed out");
res.redirect('/login');
		//res.render('login', {title : "please log in into your account"});
	}
	next();
}
};