var request = require('request');
var baseURI = require('../ignore/baseURI');
var rallyAuth = require('../ignore/rallyAuth');
var sec = require('./security.js');

exports.createUsers = function(req,res){	
	res.send(200, {
		msg: 'This is a message!',
		errors: ['This is an error!', 'This is another error!']
	});
	
	var numOfUsers = req.body.cCount;
	validateCreateFields(req,res,function(validations){
		if(validations===false) return;
		createUserRecurse(numOfUsers);
		function createUserRecurse(iterations){
			sec.getSecurityToken(function(token){
				generateUser(req,token,iterations,function(body){
					console.log(body);
					createUserRecurse(iterations-1);
				});
			});
		};
		console.log(req.body)

	});
};
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
		// request({
		// 	method: 'post',
		// 	uri: userURI,
		// 	body: myBody
		// }, function(error,response,body){
		// 	callback(body);
		// }).auth(rallyAuth[0], rallyAuth[1], false);
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
};