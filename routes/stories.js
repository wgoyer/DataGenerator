var request = require('request');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
//var baseURI = require('../credentials.js').baseURI;
//var rallyAuth = require('../credentials').credentials;
var sec = require('./security.js');

exports.rend = function(req,res){
	res.render('stories', {indexState: req.storyState});
};

exports.createStory = function(req, res){
	sec.getSecurityToken(function(token){
		generateStory(req, token, null, function(body){
			console.log(body);
			var jsonBody = JSON.parse(body);
			var formattedID = jsonBody.CreateResult.Object.FormattedID;
			console.log(formattedID);
			res.send(formattedID);
		});
	});
};

exports.createMultiStory = function(req, res){
	var numOfStories = req.body.storyCount;
	createStoriesRecurse(numOfStories)
	function createStoriesRecurse(iterations){
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
		};
	};
};

generateStory = function(req, token, count, callback){
	if(typeof(count) != "number"){
		count="";
	}	
	var userURI = baseURI+"/hierarchicalrequirement/create?key="+token;
	var myBody = JSON.stringify({
		"Hierarchicalrequirement":{
			"Name":count+req.body.storyName,
			"ScheduleState":req.body.storyState
		}
	});
	request({
		method: 'post',
		uri: userURI,
		body: myBody
	}, function(error,response,body){
		callback(body);
	}).auth(rallyAuth[0], rallyAuth[1], false);
}
