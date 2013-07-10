var express = require('express')
, path = require('path')
, rallyrequest = require('./routes/rallyrequest.js')
, routes = require('./routes')

var app = express();

app.configure(function(){
	app.set('views', __dirname+'/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.static('public'));
});

app.get('/', rallyrequest.getValues, rallyrequest.renderSomeShit);
app.get('/users', rallyrequest.users);

app.post('/createUser', rallyrequest.createUser);
app.post('/defect', rallyrequest.buildQuery, rallyrequest.getValues, rallyrequest.defect);
app.post('/story', rallyrequest.buildQuery, rallyrequest.getValues, rallyrequest.userStory);
app.post('/createManyUser', rallyrequest.createManyUser);


app.listen(8080);
console.log("Started on 8080");