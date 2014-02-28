var express = require('express')
, path = require('path')
, index = require('./routes/index.js')
, release = require('./routes/release.js')
, users = require('./routes/users.js')
, iteration = require('./routes/iteration.js')
, stories = require('./routes/stories.js')
, defects = require('./routes/defects.js')
, tags = require('./routes/tags.js')
, tasks = require('./routes/tasks.js')
, project = require('./routes/project.js')
, workspace = require('./routes/workspace.js')
, routes = require('./routes')

var app = express();

app.configure(function(){
  app.set('views', __dirname+'/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.static('public'));
});

app.get('/', index.index);

app.get('/project', project.read);
app.get('/users', users.read);
app.get('/workspace', workspace.read);

app.post('/defect', defects.createDefects);
app.post('/user', users.createUsers);
app.post('/story', stories.createStories);
app.post('/iteration', iteration.createIteration);
app.post('/release', release.createRelease);
app.post('/tag', tags.createTags);
app.post('/task', tasks.createTasks);

app.get("*", function(req,res) {
  res.send("Page not found.", 404);
});

app.listen(8080);
console.log("Started on 8080");
