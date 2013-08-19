var request = require('request');
var baseURI = require('../credentials').baseURI;
var rallyAuth = require('../credentials').credentials;
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
		console.log(req.body)
};
generateUser = function(req, token, count, callback){
	console.log('in gneerate user');
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
		console.log('request body has been put together');
	    request({
			method: 'post',
			uri: userURI,
			body: myBody
		}, function(error,response,body){
			console.log('entered request callback.');
			callback(body);
		}).auth(rallyAuth[0], rallyAuth[1], false);
}
