var request = require('request');
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
		getSecurityToken(function(token){
			createUser(req, token, null, function(body){
				console.log(body);
				res.render('users', {validationErrors:true});
			});
		});
	});
};
exports.createManyUser = function(req, res){
	validateCreateFields(req, res, function(){
		var count = req.body.cCount;
		for(q=0;q<count;q++){
			console.log(q);
			getSecurityToken(function(token){
				console.log(token, q, count);
				//createUser(req, token, i, function(body){
					//console.log(body);
					//res.render('users', {validationErrors:true});
				//});
			});
		};
	});
};
exports.users = function(req,res){
	res.render('users', {validationErrors:true});
};
exports.renderSomeShit = function(req, res){
	var results = "nothing";
	res.render('index', {output: results, indexPriority: req.priority, indexSeverity: req.severity, indexState: req.storyState});	
};
exports.userStory = function(req, res){
	var URI = baseURI + req.queryString;
	request(URI, function(error, response, body){
		var parsedJSON = JSON.parse(body);
		var results = parsedJSON.QueryResult.Results;
		res.render('index', {output: results, indexPriority: req.priority, indexSeverity: req.severity, indexState: req.storyState});
	}).auth(rallyAuth[0], rallyAuth[1], false);
};
exports.defect = function(req, res){
	var URI = baseURI + req.queryString;
	request(URI, function(error, response, body){
		var parsedjson = JSON.parse(body);
		var results = parsedjson.QueryResult.Results;
		res.render('index',{output: results, indexPriority: req.priority, indexSeverity: req.severity, indexState: req.storyState});
	}).auth(rallyAuth[0], rallyAuth[1], false);
};
exports.buildQuery = function(req, res, next){
	var values = extractValues(req);
	var helper = checkFields(values);
	getQueryString(req, values, helper);
	next();
};
createUser = function(req, token, count, callback){
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
				"UserName": count+req.body.cUser,
			}
		});
		console.log(userURI);
		console.log('-------------------');
		console.log(myBody);
		request({
			method: 'post',
			uri: userURI,
			body: myBody
		}, function(error,response,body){
			callback(body);
		});
}
validateCreateFields =  function(req, res, callback){
	var emailRegex = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	var validations = [true,true,true,true,true];
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