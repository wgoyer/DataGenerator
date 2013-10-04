Q = require 'q'
WsapiRequester = require('./utils').WsapiRequester

# Base class to persist WSAPI objects
module.exports = class ObjectCreator

  # Specify which fields to send on the object
  fields: []

  # Specify the relative uri
  uri: ''

  constructor: (@data, @response) ->
    @count = @data.count
    @wsapi = new WsapiRequester @uri

  sendRequest: ->
    @wsapi.request(
      method: 'get'
    ).then (results) =>
      @response.send results
