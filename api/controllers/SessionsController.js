/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {
		//Sessions.create({uuid: req.sessionID});
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
		
	}
};

