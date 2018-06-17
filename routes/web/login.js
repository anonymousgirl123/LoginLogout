 var User = require("../../models/user"); 
 var moment = require('moment');
 
module.exports = {

	first : function (req, res){
		res.render('login',{title : "welcome to the login page"});
	},
	second :  function (req, res){
		var data = req.body;
		console.log(data.uid);
		var newuser = new User(data);
		User.findOne({uid : req.body.uid}).exec(function (err, val){
			if(val=="" || val==null){
				newuser.save()
				.then((data) => {
					res.send({response: data, status: 200})
				})
				.catch((err) => {
					res.send({response: err, status: 500})
				})
				// return res.send("No such user exists");
			}
			if(err){
				console.log("error");
			}
            
				val.comparePassword(data.password, function (err, isMatch){
                 if(isMatch && !err){
                 	//handle sessions here
                 	req.session.name = val.email;
                 //req.session.password = val.password;
                 	req.session.logintime=moment().format('LLL');
                 	console.log("Session here:-"+req.session.name+" "+req.session.logintime);
                 	      return res.json({error : false, name : req.session.name});
                 }
                 
                 	res.send("password mismatch");
                
                 	
		        });

        });
    
    }
}
