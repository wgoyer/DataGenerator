var request = require('request');
var moment = require('moment');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
var sec = require('./security');

exports.rend = function(req, res){
	res.render('iteration');
}
exports.createIteration = function(req, res){
	var dateRange = [moment(req.body.iStartDate).format(), moment(req.body.iEndDate).format()];
	sec.getSecurityToken(function(token){
		generateIteration(req, token, null, dateRange, function(body){
			console.log(body);
			res.render('iteration');
		});	
	});
}
exports.createManyIteration = function(req, res){
	var startDate = new moment(req.body.iStartDate);
	var endDate = new moment(req.body.iEndDate);
	var dateRange=[startDate.format(),endDate.format()];
	var difference = endDate.diff(startDate, 'days');
	var numOfIterations = req.body.iCount;
	createIterationRecurse(numOfIterations);
	function createIterationRecurse(iterations){
		if(iterations <= 0){
			res.render('iteration');
			return;
		} else {
			sec.getSecurityToken(function(token){
				generateIteration(req,token,iterations,dateRange,function(body){
					console.log(body);
					startDate.add('days', difference);
					endDate.add('days', difference);
					dateRange=[startDate.format(),endDate.format()];
					createIterationRecurse(iterations-1);
				});
			});
		};
	};
};
generateIteration = function(req, token, count, dateRange, callback){
	if(typeof(count) != "number"){
		count="";
	}
	var userURI = baseURI+"/iteration/create?key="+token;
	var myBody = JSON.stringify({
		"Iteration":{
			"StartDate": dateRange[0],
			"EndDate": dateRange[1],
			"State": req.body.iState,
			"Name": count+req.body.iName
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
};