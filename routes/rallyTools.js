var request = require('request');

var baseURI = require('../credentials').baseURI;
var credentials = require('../credentials').credentials;

exports.getPriority = function(req, callback){
	var URI = baseURI+"/attributedefinition/-12513/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.priority = apiResults;
		if (typeof callback === "function"){
			callback();
		}
	});
};

exports.getSeverity = function(req, callback){
	var URI = baseURI+"/attributedefinition/-12509/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.severity = apiResults;
		if (typeof callback === "function"){
			callback();
		}
	});
};

exports.getStoryState = function(req, callback){
	var URI = baseURI+"/attributedefinition/-27506/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.storyState = apiResults;
		if (typeof callback === "function"){
			callback();
		}
	});
};

exports.getDefectEnvironments = function(req, callback){
	var URI = baseURI+"/attributedefinition/-12511/AllowedValues";
	genericApiCall(req, URI, function(apiResults){
		req.defectEnvironments = apiResults;
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
  }).auth(credentials.username, credentials.password, false);
};
