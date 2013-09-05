var rally = require('../routes/rallyTools.js');
exports.index = function(req, res){
	var returnValues = [];
	rally.getStoryState(req, function(){
		returnValues.push(1);
		checkValues(req, res, returnValues);
	});
	rally.getPriority(req, function(){
		returnValues.push(1);
		checkValues(req, res, returnValues);
	});
	rally.getSeverity(req, function(){
		returnValues.push(1);
		checkValues(req, res, returnValues);
	});
	rally.getDefectEnvironments(req, function(){
		returnValues.push(1);
		checkValues(req, res, returnValues);
	});
};

checkValues = function(req, res, returnValues){
	if (returnValues.length === 4){
		res.render('index', {indexState: req.storyState, indexPriority: req.priority, indexSeverity: req.severity, indexEnvironments: req.defectEnvironments});
	} else {
		return;
	}
};