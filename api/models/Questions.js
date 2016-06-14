/**
 * Questions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	text: {
  		type: 'string',
  		required: true
  	},
  	order: {
  		type: 'integer',
      defaultsTo: 0
  	},
    enabled: {
      type: 'boolean',
      defaultsTo: true
    },
    tags: {
      collection: 'tags',
      via: 'questions'
    }
  },
  random: function(result) {

    var self = this;

    this.count(function(err, num) {
        if(err)
          return result(err, false);

        var randm = Math.floor((Math.random() * num));

        if(randm < 0) randm = 0;

        self.find({skip: randm, limit: 1}).exec(function(err, question) {
          return result(err, question);
        });
    });

  }
};

