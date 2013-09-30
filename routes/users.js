var request = require('request');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
var sec = require('./security.js');
var _ = require('underscore');

exports.createUsers = function(req,res){

	var count = req.body.userAmount;
  var wsapiResponse = [];

  var sendResponse = _.after(count, function() {
    res.send(wsapiResponse);
  });

	createUserRecurse(count);
	function createUserRecurse(iterations){
		if(iterations<=0){
			return;
		}

		sec.getSecurityToken(function(token){
			generateUser(req,token,iterations,function(body){
        console.log(body);
        var parsedJson = JSON.parse(body);
        if(!_.isUndefined(parsedJson.CreateResult)){
          wsapiResponse.push(parsedJson.CreateResult);
        }
        sendResponse();
				createUserRecurse(iterations-1);
			});
		});
	};
};


var fields = ["EmailAddress", "FirstName", "LastName", "DisplayName", "UserName"]
var values = ["userEmail", "userFirstName", "userLastName", "userDisplayName", "userName"]
var uri = baseURI+"/user/create";

var generateObjectJson = function(data, fields, values) {
  var result = {};
  _.times(fields.length, function(n) {
    result[fields[n]] = data[values[n]];
  });
  return JSON.stringify({User: result});
};



var handleWsapiResponse = function(body) {
  
};

var generateUser = function(req, token, count, callback){
	if(typeof(count) != "number"){
		count="";
	}
    
  data = _.clone(req.body);
  
  data.userEmail = data.userEmail.replace(/^([^@]+)/, '$1' + count);
  data.userName = data.userName.replace(/^([^@]+)/, '$1' + count);
  
  var data = generateObjectJson(data, fields, values);
  
  console.log('sending data', data);
  
  request({
		method: 'post',
		uri: uri + "?key="+token,
		body: data
	}, function(error,response,body){
			callback(body);
	}).auth(rallyAuth[0], rallyAuth[1], false);
}
