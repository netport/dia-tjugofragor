/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {
		var question = {};
		Questions.find().limit(1).skip(Math.random() * 2).exec(function(err, result) {

			Sessions.create({
				uuid: req.sessionID,
				question: result
			});
			return res.json({
				question: result,
				uuid: req.sessionID
			});
		});
		
	},
	save: function(req, res){
		console.log(req.sessionID);
	},
	getQuestion: function(req, res){
		/*Questions.find().where({'tags': [{'text': 'par'}] }).exec(function(err, result){
			console.log(err, result);
		});*/

		Tags.findOne().where({'text': 'havsnära'})
        .populate('questions')
        .exec(function(e, c) {
        	return res.json({
				result: c,
				uuid: req.sessionID
			});
        })
		
		

		
	}
};

