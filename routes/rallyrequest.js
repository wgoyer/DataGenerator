var request = require('request');
var moment = require('moment');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
exports.getValues = function(req, res, next){
	getPriority(req, function(){
		getSeverity(req, function(){
			getStoryState(req, function(){
				next();
			});
		});
	});
};
exports.createUser = function (req, res){
	validateCreateFields (req, res, function(validations){
		console.log(validations);
		if(validations===false) return;
		getSecurityToken(function(token){
			generateUser(req, token, null, function(body){
				console.log(body);
				res.render('users', {validationErrors:true});
			});
		});
	});
};
exports.createManyUser = function(req,res){
	numOfUsers = req.body.cCount;
	validateCreateFields(req,res,function(){
		if(validations===false) return;
		createUserRecurse(numOfUsers);
		function createUserRecurse(iterations){
			if(iterations <= 0){
				res.render('users', {validationErrors:true});
				return;
			} else {
				getSecurityToken(function(token){
					generateUser(req,token,iterations,function(body){
						console.log(body);
						createUserRecurse(iterations-1);
					});
				});
			};
		};
	});
};
exports.iteration = function(req, res){
	res.render('iteration');
}
exports.createIteration = function(req, res){
	console.log(req.body);
	getSecurityToken(function(token){
		generateIteration(req, token, null, function(body){
			console.log(body);
			res.render('iteration');
		});	
	});
}
exports.createManyIteration = function(req, res){
	console.log(req.body.iEndDate);

	res.render('iteration');
}

exports.users = function(req,res){
	res.render('users', {validationErrors:true});
};
exports.index = function(req, res){
	res.render('index');
}
exports.query = function(req, res){
	var results = "nothing";
	res.render('query', {output: results, indexPriority: req.priority, indexSeverity: req.severity, indexState: req.storyState});
};
exports.userStory = function(req, res){
	var URI = baseURI + req.queryString;
	request(URI, function(error, response, body){
		var parsedJSON = JSON.parse(body);
		var results = parsedJSON.QueryResult.Results;
		res.render('query', {output: results, indexPriority: req.priority, indexSeverity: req.severity, indexState: req.storyState});
	}).auth(rallyAuth[0], rallyAuth[1], false);
};
exports.defect = function(req, res){
	var URI = baseURI + req.queryString;
	request(URI, function(error, response, body){
		var parsedjson = JSON.parse(body);
		var results = parsedjson.QueryResult.Results;
		res.render('query',{output: results, indexPriority: req.priority, indexSeverity: req.severity, indexState: req.storyState});
	}).auth(rallyAuth[0], rallyAuth[1], false);
};
exports.buildQuery = function(req, res, next){
	var values = extractValues(req);
	var helper = checkFields(values);
	getQueryString(req, values, helper);
	next();
};
generateIteration = function(req, token, count, callback){
	var endDate = req.body.iEndDate;
	console.log(endDate);
	if(typeof(count) != "number"){
		count="";
	}
	endDate = moment(endDate).format();
	var startDate = moment(req.body.iStartDate).format();
	var userURI = baseURI+"/iteration/create?key="+token;
	var myBody = JSON.stringify({
		"Iteration":{
			"EndDate": endDate,
			"StartDate": startDate,
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
}
generateUser = function(req, token, count, callback){
	if(typeof(count) != "number"){
		count="";
	}
		var userURI = baseURI+"/user/create?key="+token;
		var myBody = JSON.stringify({
			"User":{
				"EmailAddress":req.body.cEmail,
				"FirstName":req.body.cFirst+count,
				"LastName":req.body.cLast+count,
				"DisplayName":req.body.cDisplay+count,
				"UserName": count+req.body.cUser
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
validateCreateFields =  function(req, res, callback){
	var emailRegex = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	var validations = true;
	var validationPass = true;
	if(!emailRegex.test(req.body.cEmail)){
		validations[0]=false;
	}
	if(req.body.cFirst === ''){
		validations[1]=false;
	}
	if(req.body.cLast === ''){
		validations[2]=false;
	}
	if(req.body.cUser === ''){
		validations[3]=false;
	}
	if(req.body.cDisplay === ''){
		validations[4]=false;
	}
		for(i=0;i<validations.length;i++){
			if (validations[i] === false){
				validationPass = false;
			}
		}
		if(validationPass === false){
			console.log(validations);
			res.render('users', {validationErrors:validations});
		} else {
			callback(validations);
		}
}
getPriority = function(req, callback){
	var URI = baseURI+"/attributedefinition/-12513/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.priority = apiResults;
		if (typeof callback === "function"){
			callback();	
		}	
	});
};
getSeverity = function(req, callback){
	var URI = baseURI+"/attributedefinition/-12509/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.severity = apiResults;
		if (typeof callback === "function"){
			callback();	
		}
	});
};
getStoryState = function(req, callback){
	var URI = baseURI+"/attributedefinition/-27506/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.storyState = apiResults;
		if (typeof callback === "function"){
			callback();	
		}
	});
};
genericApiCall = function(req, URI, callback){
	var apiResults = [];
	request(URI, function(error,response,body){
		var parsedjson = JSON.parse(body);
		var jsonPayload = parsedjson.QueryResult.Results;
		for(i=0;i<jsonPayload.length;i++){
			apiResults.push(jsonPayload[i].StringValue);
		}
		callback(apiResults);
	}).auth(rallyAuth[0], rallyAuth[1], false);
};
extractValues = function(req){
	var values = [];
	var helper = [];
	if(req.url === '/defect'){
		values = [req.body.dName, req.body.dSeverity, req.body.dPriority];
	} else {
		values = [req.body.sName, req.body.sState];
	}
	return values;
};
checkFields = function(values){
	var helper = [];
	for(i=0;values.length>i;i++){
			if(values[i] != ''){
				helper.push(1);
			} else helper.push(0);
	};
	return helper;
};
getSecurityToken = function(callback){
	var secURI = baseURI+"/security/authorize"
	request(secURI, function(error,response,body){
		var parsedjson = JSON.parse(body);
		var token = parsedjson.OperationResult.SecurityToken;
		callback(token);
	}).auth(rallyAuth[0], rallyAuth[1], false);
};
getQueryString = function(req, values, helper){
	if(req.url === '/defect'){
		switch(helper.toString())
		{
			case '1,0,0':
				req.queryString = "/defect?query=(Name contains \""+values[0]+"\")";
			break;
			case '1,1,0':
				req.queryString = "/defect?query=((Name contains \""+values[0]+"\") and (Severity = \""+values[1]+"\"))";
			break;
			case '1,1,1':
				req.queryString = "/defect?query=((Name contains \""+values[0]+"\") and (Severity = \""+values[1]+"\") and (Priority = \""+values[2]+"\"))";
			break;
			case '0,1,0':
				req.queryString = "/defect?query=(Severity = \""+values[1]+"\")";
			break;
			case '0,1,1':
				req.queryString = "/defect?query=((Severity = \""+values[1]+"\") and (Priorty = \""+values[2]+"\"))";
			break;
			case '0,0,1':
				req.queryString = "/defect?query=(Priority = \""+values[2]+"\")";
			break;
			case '1,0,1':
				req.queryString = "/defect?query=((Name contains \""+values[1]+"\") and (Priority = \""+values[2]+"\"))";
			break;
			case '0,0,0':
				req.queryString = "/defect";
			break;
		}
	}
	else {
		switch(helper.toString())
		{
			case '1,0':
				req.queryString = "/hierarchicalrequirement?query=(Name contains \""+values[0]+"\")";
			break;
			case '1,1':
				req.queryString = "/hierarchicalrequirement?query=((Name contains \""+values[0]+"\") and (ScheduleState = \""+values[1]+"\"))";
			break;
			case '0,1':
				req.queryString = "/hierarchicalrequirement?query=(ScheduleState = \""+values[1]+"\")";
			break;
			case '0,0':
				req.queryString = "/hierarchicalrequirement"
			break;
		}
	}
};