var request = require('request');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
var sec = require('./security.js');

exports.rend = function(req,res){
	res.render('stories', {indexState: req.storyState});
};

exports.createStory = function(req, res){
	sec.getSecurityToken(function(token){
		generateStory(req, token, null, function(body){
			console.log(body);
			res.render('stories', {indexState: req.storyState});
		});
	});
};

exports.createMultiStory = function(req, res){
	var numOfStories = req.body.sCount;
	createStoriesRecurse(numOfStories)
	function createStoriesRecurse(iterations){
		if(iteration<=0){
			res.render('stories', {indexState: req.storyState});
			return;
		} else {
			sec.getSecurityToken(function(token){
				generateUser(req, token, iterations, function(body){
					console.log(body);
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
				"Name":count+req.body.sName,
				"ScheduleState":req.body.sState
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
