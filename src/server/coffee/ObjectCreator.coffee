WsapiRequester = require('./utils').WsapiRequester

# Base class to persist WSAPI objects
module.exports = class ObjectCreator
    
  constructor: (@data, @response) ->
    @count = @data.count
    @wsapi = new WsapiRequester @uri
  
  transformData: ->
    data = {}

    for field in @fields
      data[field] = @data[field]

    data
