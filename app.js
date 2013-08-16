var express = require('express')
, path = require('path')
, index = require('./routes/index.js')
, release = require('./routes/release.js')
, query = require('./routes/query.js')
, users = require('./routes/users.js')
, iteration = require('./routes/iteration.js')
, stories = require('./routes/stories.js')
, test = require('./routes/test.js')
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
//app.get('/users', users.rend);
app.get('/iteration', iteration.rend);
app.get('/release', release.rend);
app.get('/stories', query.getValues, stories.rend);

app.post('/createUsers', users.createUsers);
app.post('/multiStory', stories.createMultiStory);
app.post('/createStory', stories.createStory);

app.post('/defect', query.buildQuery, query.getValues, query.defect);
app.post('/story', query.buildQuery, query.getValues, query.userStory);
app.post('/iteration', iteration.createIteration);
app.post('/multiIteration', iteration.createManyIteration);
app.post('/release', release.createRelease);
app.post('/multiRelease', release.createManyRelease);

app.get("*", function(req,res) {
	res.send("Page not found.", 404);
});

app.listen(8080);
console.log("Started on 8080");
