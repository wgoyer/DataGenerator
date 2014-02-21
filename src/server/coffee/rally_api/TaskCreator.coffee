ObjectCreator = require './ObjectCreator'

# WSAPI Users Class
module.exports = class StoryCreator extends ObjectCreator

  fields: ["Name", "Parent"]
  uri: '/task/create'

  transformData: (i) ->
    data = super()

    if @count > 1
      data.Name += i

    data
