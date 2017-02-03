module.exports = {
	authenticate : function (req, res, next){
	if(req.session.name==undefined){
		console.log("user signed out");
res.redirect('/login');
	}
	if(req.session!=""){
		console.log("user already logged in");
		//res.redirect('/list');
	}
	next();
}
};
