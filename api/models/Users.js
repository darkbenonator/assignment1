/**
 * Users.js
 *
 * @description :: Create a user
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'users',
	schema: true,
    adapter: 'mysqladapter',
  attributes: {
		 userid:{
			type:'integer',
			required:true,
			primarykey: true,
			autoincrement: true
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
		 }
  }
};

