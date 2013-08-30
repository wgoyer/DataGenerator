var request = require('request');
var moment = require('moment');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
//var baseURI = require('../credentials.js').baseURI;
//var rallyAuth = require('../credentials').credentials;
var sec = require('./security');

exports.rend = function(req, res){
	res.render('release');
}

//exports.createRelease = function(req, res){
//	var dateRange = [moment(req.body.rStartDate).format(), moment(req.body.rEndDate).format()];
//	sec.getSecurityToken(function(token){
//		generateRelease(req, token, null, dateRange, function(body){
//			console.log(body);
//			res.render('release');
//		});	
//	});
//}

exports.createRelease = function(req, res){
	var startDate = new moment(req.body.rStartDate);
	var endDate = new moment(req.body.rEndDate);
	var dateRange=[startDate.format(),endDate.format()];
	var difference = endDate.diff(startDate, 'days');
	var numOfIterations = req.body.rCount;
	createIterationRecurse(numOfIterations);
	function createIterationRecurse(iterations){
		if(iterations <= 0){
			res.render('release');
			return;
		} else {
			sec.getSecurityToken(function(token){
				generateRelease(req,token,iterations,dateRange,function(body){
					console.log(body);
					startDate.add('days', difference);
					endDate.add('days', difference);
					dateRange=[startDate.format(),endDate.format()];
					createIterationRecurse(iterations-1);
				});
			});
		};
	};
}

generateRelease = function(req, token, count, dateRange, callback){
	if(typeof(count) != "number"){
		count="";
	}
	var userURI = baseURI+"/release/create?key="+token;
	var myBody = JSON.stringify({
		"Release":{
			"ReleaseStartDate": dateRange[0],
			"ReleaseDate": dateRange[1],
			"State": req.body.rState,
			"Name": count+req.body.rName
		}
	});
	console.log(myBody);
	request({
		method: 'post',
		uri: userURI,
		body: myBody
	}, function(error,response,body){
		callback(body);
	}).auth(rallyAuth[0], rallyAuth[1], false);
}