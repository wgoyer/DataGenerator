StoryCreator = require '../rally_api/StoryCreator'

exports.createStories = (req, response) ->
  
  storyCreator = new StoryCreator req.body, response

  storyCreator.sendRequests()
