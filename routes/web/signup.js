var User = require("../../models/user"); 
module.exports = {
	first : function (req, res){
		res.render('signup');
	},
	second : function (req, res){
		var data = req.body;
		console.log(data);
		var query = User(data);
		query.save(function (err, val){
			if(err){
				res.send("error");
				console.log("error");
			}
			else{
				console.log(val);
			}
		});
   /* var uname1 = req.body.fname;
    var uname2 = req.body.flast;
    var uemail = req.body.fmail;
    var fpassword = req.body.fpassword;
*/
    //console.log(uname1, uname2, uemail, fpassword);
    
	   res.send('user signed up');
	   res.render('login');
    },
    abc : function (req, res){
		var n = req.session.name;
		
		res.render('list', {title : n});
	},
	xyz : function (req, res){
		req.session.destroy();
		res.render('login', {title : "user logged out"});
		}
    
}
