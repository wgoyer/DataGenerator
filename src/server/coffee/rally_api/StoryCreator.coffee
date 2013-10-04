ObjectCreator = require './ObjectCreator'

# WSAPI Users Class
module.exports = class StoryCreator extends ObjectCreator

  fields: ["Name", "Description", "ScheduleState", "Release", "Iteration"]
  uri: '/hierarchicalrequirement/create'

  transformData: (i) ->
    data = super()
    
    if @count > 1
      data.Name += i

    data
