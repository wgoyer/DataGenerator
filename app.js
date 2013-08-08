var express = require('express')
, path = require('path')
, index = require('./routes/index.js')
, release = require('./routes/release.js')
, query = require('./routes/query.js')
, users = require('./routes/users.js')
, iteration = require('./routes/iteration.js')
, routes = require('./routes')

var app = express();

app.configure(function(){
	app.set('views', __dirname+'/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.static('public'));
});

app.get('/', index.index);
app.get('/query', query.getValues, query.rend);
app.get('/users', users.rend);
app.get('/iteration', iteration.rend);
app.get('/release', release.rend);

app.post('/createUser', users.createUser);
app.post('/createManyUser', users.createManyUser);
app.post('/defect', query.buildQuery, query.getValues, query.defect);
app.post('/story', query.buildQuery, query.getValues, query.userStory);
app.post('/iteration', iteration.createIteration);
app.post('/multiIteration', iteration.createManyIteration);
app.post('/release', release.createRelease);
app.post('/multiRelease', release.createManyRelease);


app.listen(8080);
console.log("Started on 8080");