var User = require("../../models/user");
module.exports = {
	first : function (req, res){
		res.render('signup');
	},
	view: function (req, res){
		User.find({}, function (err, docs) {
  		if(err){
				res.send({error: true})
			}
			else{
				res.render('user_info', {data: docs});
			}
		});
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
	   res.send({data: 'user signed up', status:200});

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
