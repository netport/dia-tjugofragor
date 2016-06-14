/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {

		Sessions.findOrCreate({'uuid': req.sessionID, 'uuid': req.sessionID}).exec(function(err, result){
			console.log('User: '+req.sessionID+' logged in!');
			var user = result;
			Questions.random(function(err, question) {
				console.log(question);
				return res.view('layout', {
					user: user,
					question: question[0],
					error: err
			    });
				/*return res.json({
					user: user,
					question: question,
					error: err
				});*/
			});
		});
		
	},
	save: function(req, res){
		console.log(req.sessionID);
	},
	getQuestion: function(req, res){

		Sessions.findOne({'uuid': req.sessionID}).exec(function(err, result){
			var User = result;

			User.answers = [{'question': req.headers.question},
							{'answer': req.headers.answer},
							{'tags': req.headers.tags }];
			//User.tags = {'answer': req.headers.tags};

			console.log(User);

		});

		Tags.findOne().where({'id': 'havsnära'})
        .populate('questions')
        .exec(function(e, c) {
        	return res.json({
				result: c,
				uuid: req.sessionID
			});
        });
		
	},
	answer: function(req, res) {
		Sessions.findOne(req.sessionID).exec(function(err, result){
			var user = result;

		});
	}
};

