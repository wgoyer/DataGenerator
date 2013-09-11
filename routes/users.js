var request = require('request');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
var sec = require('./security.js');

exports.createUsers = function(req,res){	
	var numOfUsers = req.body.userAmount;
		createUserRecurse(numOfUsers);
		function createUserRecurse(iterations){
			if(iterations<=0){
				return;
			}
			sec.getSecurityToken(function(token){
				generateUser(req,token,iterations,function(body){
					res.send({
						msg: body
					});
					console.log(body)
					createUserRecurse(iterations-1);
				});
			});
		};
};
generateUser = function(req, token, count, callback){
	if(typeof(count) != "number"){
		count="";
	}
		var userURI = baseURI+"/user/create?key="+token;
		var myBody = JSON.stringify({
			"User":{
				"EmailAddress":req.body.userEmail,
				"FirstName":req.body.userFirstName,
				"LastName":req.body.userLastName,
				"DisplayName":req.body.userDisplayName,
				"UserName": count+req.body.userName
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
