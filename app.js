var express = require('express')
, path = require('path')
, index = require('./routes/index.js')
, release = require('./routes/release.js')
, users = require('./routes/users.js')
, iteration = require('./routes/iteration.js')
, stories = require('./routes/stories.js')
, defects = require('./routes/defects.js')
, routes = require('./routes')

var app = express();

app.configure(function(){
	app.set('views', __dirname+'/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.static('public'));
});

app.get('/', index.index);

app.post('/createDefects', defects.createDefect);
app.post('/createUsers', users.createUsers);
app.post('/createStory', stories.createStory);
app.post('/iteration', iteration.createIteration);
app.post('/release', release.createRelease);

app.get("*", function(req,res) {
	res.send("Page not found.", 404);
});

app.listen(8080);
console.log("Started on 8080");
