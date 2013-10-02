var request = require('request');

exports.createDefect = function(req, res){
	var numOfDefects = req.body.defectAmount;
	createDefectRecurse(numOfDefects);
	function createDefectRecurse(iterations){
		if(iterations<=0){
			return;
		} else {
			sec.getSecurityToken(function(token){
				generateDefect(req, token, iterations, function(body){
					var jsonBody = JSON.parse(body);
					var formattedID = jsonBody.CreateResult.Object.FormattedID;
					console.log(formattedID);
					res.send({
						msg : formattedID
					});
					createDefectRecurse(iterations-1);
				});
			});
		}
	}
};

generateDefect = function(req, token, count, callback){
	if(typeof(count) != "number"){
		count="";
	}
	var userURI = baseURI+"/defect/create?key="+token;
	var myBody = JSON.stringify({
		"Defect":{
			"Name":count+req.body.defectName,
			"Priority":req.body.defectPriority,
			"Severity":req.body.defectSeverity,
			"Environment":req.body.defectEnvironment
		}
	});
	request({
		method: 'post',
		uri: userURI,
		body: myBody
	}, function(error,response,body){
		callback(body);
	})
};
