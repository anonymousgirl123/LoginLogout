
var User = require("../../models/user"); 
module.exports = {
	first : function (req, res){
		var n = req.session.name;
		
		res.render('list', {title : n});
	},
	second : function (req, res){
		req.session.destroy();
		res.render('login');
		}
   
};
