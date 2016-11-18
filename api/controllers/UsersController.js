/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req,res){
		res.view();
	},
	
	create: function(req,res, next){
		Users.create( req.params.all(), function usersCreated(err, Users){
			if(err) return next(err);
			res.redirect('users/show/' + Users.userid);
		});	
	},
	
	show: function(req,res, next){
		Users.findOne({ where: { userid : req.param('id') }}, function foundUser(err, Users){
			if(err) return next(err);
			if(!Users) return next();
			res.view({
				Users:Users
			});	
		});
	},
	
	remove : function(req,res, next){
		Users.destroy( { where: { userid : req.param('id') }}, function RedirectNew(err){
			if(err) return next(err);
			res.redirect('/users/new');
		});
	},
	
	update : function(req,res, next){
		var params = req.params.all();
		Users.update( { where: { userid : params.userid }},{firstname : params.firstname, LastName : params.LastName, username : params.username}).exec(function RefreshShow(err, updated){
			if(err) return next(err);
			res.redirect('users/show/' + updated[0].userid);
		});
	}	
};

