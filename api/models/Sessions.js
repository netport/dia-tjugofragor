/**
 * Sessions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    uuid: {
      type: 'string',
    },
  	questions: {
  		collection: 'questions',
  		via: 'id'
  	},
  	tags: {
  		collection: 'tags',
  		via: 'id'
  	}
  }
};

