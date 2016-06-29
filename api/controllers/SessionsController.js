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
		
	}
};

