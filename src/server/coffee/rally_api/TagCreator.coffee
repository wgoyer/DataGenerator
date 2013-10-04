ObjectCreator = require './ObjectCreator'

# WSAPI Tags Class
module.exports = class TagCreator extends ObjectCreator

  fields: ["Name"]
  uri: '/tag/create'

  transformData: (i) ->
    data = super()

    if @count > 1
      data.Name += i

    data
