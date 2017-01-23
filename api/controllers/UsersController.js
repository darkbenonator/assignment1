/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 */
 //BcryptJS for encrypting passwords
var bcrypt = require('bcryptjs');
 //Salt used for password encryption 
var salt = bcrypt.genSaltSync(10);

module.exports = {
	
    /**
	   * @param  {req}   request 
	   * @param  {res} 	 response
	   *  Loads the view for entering the new user details 
    */	
	'new': function(req,res){
		res.view();
	},
		
	/**
	   * @param  {req}   request
	   *                     • Username{String}	   
	   *                     • Password{String}	   
	   * @param  {res} 	 response
	   * @param  {next}	 Next Page
	   *  Hash the password
	   *  Create the user object within the database with the hashed database
	   *  Redirects to the sow user page with the new users id 	   
	   * TODO: Move the create to the model
    */		
	create: function(req,res, next){
			bcrypt.hash(req.param('password'), salt, function(err, hash) {
				Users.create({
				  Username: req.param('Username'),
				  firstname: req.param('firstname'),
				  LastName: req.param('LastName'),
				  password: hash
				}).exec( function usersCreated(err, Users){
				if(err) return next(err);
					res.redirect('users/show/' + Users.userid);
				});	
			});
	},
	
	/**
	   * @param  {req}   request
	   *                     • userid{int}	   
	   * @param  {res} 	 response
	   * @param  {next}	 Next Page
	   *  Retrieves the user object where it matches the userid and loads the view and passes the User object. If there is an error load the error page. 
	   * TODO: Move the find to the model
    */	
	show: function(req,res, next){
		Users.findOne({ where: { userid : req.param('id') }}, function foundUser(err, Users){
			if(err) return next(err);
			if(!Users) return next();
			res.view({
				Users:Users
			});	
		});
	},
	
	
	/**
	   * @param  {req}   request
	   *                     • userid{int}	   
	   * @param  {res} 	 response
	   * @param  {next}	 Next Page
	   *  Remove the user from the database where the userid matches. Client is then redirected to the new users page.
	   * TODO: Move the delete function to the model.
    */	
	remove : function(req,res, next){
		Users.destroy( { where: { userid : req.param('id') }}, function RedirectNew(err){
			if(err) return next(err);
			res.redirect('/users/new');
		});
	},
	
    /**
	   * @param  {req}   request
	   *                     • userid {int}
	   *                     • firstname {String}	
	   *                     • LastName {String}	
	   *                     • username {String}		   
	   * @param  {res} 	 response
	   * @param  {next}	 Next Page
	   *  update Where the user matches the id it will update the user with the entered inputs. 
	   *If succesful the client will be redirected to the show page with the updated values, if there is an error the client is redirected to the error page. 
	   * TODO: Move the update function to the model.
    */		
	update : function(req,res, next){
		var params = req.params.all();
		Users.update( { where: { userid : params.userid }},{firstname : params.firstname, LastName : params.LastName, username : params.username}).exec(function RefreshShow(err, updated){
			if(err) return next(err);
			res.redirect('users/show/' + updated[0].userid);
		});
	},
	
	searchPage : function(req,res){
		res.view();
	},
	
	
    /**
	   * @param  {req}   request
	   *                     • searchTerm {String}	   
	   * @param  {res} 	 response
	   *  search searches the users model to find a user that is like firstname, lastname or username and returns the users in Json. 
	   * TODO: Move the search function to the model.
    */	
    search : function(req, res){
		var searchQuery = req.param('searchTerm');
		Users.find({ 
			or :[ 
					{ like: { firstname: '%'+ searchQuery +'%' } }, { like: { LastName : '%'+searchQuery+'%' }}, { like: { Username : '%'+searchQuery+'%' } } 
				] 
		} , function ( err, users ){
			return res.json(users);
		});
	},
	
    /**
	   * @param  {req}   request
	   *                     • Username {String}
       *                     • password {String}	   
	   * @param  {res} 	 response
	   *  login calls the function response login function. If successful will redirect to the search page, if not will reload the login page
    */	
	login: function (req, res) {
			return res.login({
				Username: req.param('Username'),
				password: req.param('password'),
				Salt: salt,
				successRedirect: '/users/searchPage',
				invalidRedirect: '/'
			});
	},
  
    /**
	   * @param  {req}   request
	   * @param  {res} 	 response
	   *  Logout sets the session to null and then redirects to the start screen. 
   */
  logout: function (req, res) {
    req.session.me = null;
    return res.redirect('/');
  }
};

