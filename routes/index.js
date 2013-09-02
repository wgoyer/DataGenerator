var rally = require('../routes/rallyTools.js');
exports.index = function(req, res){
	rally.getStoryState(req, function(){
		console.log(req.storyState);
		res.render('index', {indexState: req.storyState});
	});
};