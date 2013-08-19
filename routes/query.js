var request = require('request');
var baseURI = require('../credentials.js').baseURI;
var rallyAuth = require('../credentials').credentials;

exports.rend = function(req, res){
	var results = "nothing";
	res.render('query', {output: results, indexPriority: req.priority, indexSeverity: req.severity, indexState: req.storyState});
};

exports.getValues = function(req, res, next){
	getPriority(req, function(){
		getSeverity(req, function(){
			getStoryState(req, function(){
				next();
			});
		});
	});
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
getStoryState = function(req, callback){
	var URI = baseURI+"/attributedefinition/-27506/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.storyState = apiResults;
		if (typeof callback === "function"){
			callback();	
		}
	});
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