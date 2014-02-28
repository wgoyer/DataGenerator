Q = require 'q'
ObjectCreator = require './ObjectCreator'

# WSAPI Users Class
module.exports = class TaskCreator extends ObjectCreator

  fields: ["Name", "WorkProduct"]
  uri: '/task/create'

  transformData: (i) ->
    data = super()

    if @count > 1
      data.Name += i

    data
