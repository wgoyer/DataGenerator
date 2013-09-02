var request = require('request');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
//var baseURI = require('../credentials.js').baseURI;
//var rallyAuth = require('../credentials').credentials;
var sec = require('./security.js');

exports.createDefect = function(req, res){
	var numOfStories = req.body.storyCount;
	createStoriesRecurse(numOfStories);
	function createDefectsRecurse(iterations){
		if(iterations<=0){
			return;
		} else {
			sec.getSecurityToken(function(token){
				generateStory(req, token, iterations, function(body){
					var jsonBody = JSON.parse(body);
					var formattedID = jsonBody.CreateResult.Object.FormattedID;
					console.log(formattedID);
					res.send(formattedID);
					createStoriesRecurse(iterations-1);
				});
			});
		}
	}
};

generateDefect = function(req, token, count, callback){
	if(typeof(count) != "number"){
		count="";
	}
	var userURI = baseURI+"/defect/create?key="+token;
	var myBody = JSON.stringify({
		"Defect":{
			"Name":count+req.body.defectName,
			"Priority":req.body.defectState,
			"Severity":req.body.defectSeverity
		}
	});
	request({
		method: 'post',
		uri: userURI,
		body: myBody
	}, function(error,response,body){
		callback(body);
	}).auth(rallyAuth[0], rallyAuth[1], false);
};
