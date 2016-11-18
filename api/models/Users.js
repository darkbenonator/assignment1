/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
		 }
  }
};

