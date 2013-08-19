var baseURI = require('../credentials.js').baseURI;
var rallyAuth = require('../credentials').credentials;
var request = require('request');

exports.getSecurityToken = function(callback){
	var secURI = baseURI+"/security/authorize"
	request(secURI, function(error,response,body){
		var parsedjson = JSON.parse(body);
		var token = parsedjson.OperationResult.SecurityToken;
		callback(token);
	}).auth(rallyAuth[0], rallyAuth[1], false);
};