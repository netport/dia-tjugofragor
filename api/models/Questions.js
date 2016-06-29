/**
 * Questions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
    },
  	text: {
  		type: 'string',
  		required: true
  	},
    enabled: {
      type: 'boolean',
      defaultsTo: true
    },
    positive_tags: {
      type: 'array',
      required: true
    },
    negative_tags: {
      type: 'array'
    }
  },

  //A function for findning one random question.
  random: function(result) {

    var self = this;

    var questions = array();

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

