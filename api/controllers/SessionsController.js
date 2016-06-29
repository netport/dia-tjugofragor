/**
 * SessionsController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getQuestions: function(req, res) {
		var randomz = [];

		function getRandomNumber() {
			return Math.floor((Math.random() * 20) + 1);
		}

		while(randomz.length < 5) {
			var temp = getRandomNumber();
			console.log(temp);
			randomz.push(temp);
		}
		
		Questions.find({id: randomz}).exec(function(err, questions){
			return res.view('questions', {
				questions: questions,
				error: err
			});
		});
	},
	calculate: function(req, res) {
		
		var positive_tags = req.body.positive_tags.split(',');
		var negative_tags = req.body.negative_tags.split(',');

		//console.log('Positive tags: '+positive_tags);

		var best_match = {};

		Pois.find().exec(function(err, pois){
			for(var i=0; i<pois.length; i++) {

				var poi = pois[i];
				var poi_tags = pois[i].tags;
				poi.points = 0;

				for(var j=0; j<poi_tags.length; j++) {

					var tag = poi_tags[j];

					for(var k=0; k<positive_tags.length; k++) {
						if(tag == positive_tags[k]) {
							poi.points++;
						}
					}

				}

				if(best_match.points == undefined || best_match.points < poi.points) {
					best_match = poi;
				}
			}

			console.log(best_match);

			return res.view('result', {poi: best_match});
			
		});
		
	},
	login: function(req, res) {

		Sessions.findOrCreate({'uuid': req.sessionID, 'uuid': req.sessionID}).exec(function(err, result){
			console.log('User: '+req.sessionID+' logged in!');
			var user = result;

			Questions.random(function(err, question) {
				return res.view('layout', {
					user: user,
					question: question[0],
					error: err
			    });
			});
		});
		
	},
	getNewQuestion: function(req, res){
		var request = req.body;


		//Save positive question to sessions. These are to be used for finding others.
		if(request) {
			if(request.rank == 'positive') {
				Sessions.findOne({uuid: req.sessionID})
				.exec(function(err, result){
					userid = result.id
					Questions.findOne({id: request.question})
					.exec(function(err, question){
						question.sessions.add(userid);
						question.save();
					});
				});
			}
		}

		Sessions.query('SELECT * FROM sessions', function(err, result){
			console.log(result);
		});

		//***
		// TODO: Check if we allready have an answer.
		// Randomize if we want to show an answer if it exists.
		// If there is only one answer left, shot it.
		// Keep asking random new questions

		/*
		
		console.log(req.sessionID);
		Sessions.findOne({'uuid': req.sessionID})
		.populate('questions')
		.populate('tags')
		.exec(function(err, result){
			console.log(result);
		});

		return res.json({question: 'hej'});

		*/

	},
	getNewQuestion2: function(req, res){
		var sessionID = 51;

		Sessions.query('SELECT sessions.id AS sessionID, questions.id AS questionID FROM sessions INNER JOIN questions_sessions__sessions_questions ON questions_sessions__sessions_questions.sessions_questions = sessions.id INNER JOIN questions ON questions_sessions__sessions_questions.questions_sessions = questions.id WHERE sessions.id = 51', function(err, result){
			console.log(result);
		});

	}
};

