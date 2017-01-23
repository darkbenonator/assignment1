/**
 * Users.js
 *
 * @description :: Represents the Users table in the database 
 */
 //BCryptJS for password encryption
var bcrypt = require('bcryptjs');
 
module.exports = {
    tableName: 'users',
	schema: true,
    adapter: 'mysqladapter',
	autoPK: false,

  attributes: {
		userid:{
			type:'integer',
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		firstname:{
			type:'string',
			required:true
		},
		
		LastName:{
			 type:'string',
			 required:true
		 },
		
		Username:{
			 type:'string',
			 required:true,
			 unique: true
		 },
	    password: {
		    type: 'string',
		    required: true
		}
    },
  /**
   * Check validness of a login using the provided inputs. Checks the password against the inputted password using Bcrypt. if correct assigns the user. 
   *
   * @param  {inputs}   inputs
   *                     • Username    {String}
   *                     • password {String}
   * @param  {Function} cb
   */
  attemptLogin: function (inputs, cb) {
	   	Users.findOne({
			Username: inputs.Username,
	    }, function usersCreated(err, Users){
				var users  = null;
				if(bcrypt.compareSync(inputs.password, Users.password) == true) users = Users;
				cb(users)
			}
		);
    }
 };

