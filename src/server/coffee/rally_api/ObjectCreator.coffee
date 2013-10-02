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

  transformData: ->
    data = {}

    for field in @fields
      data[field] = @data[field]

    data

  toJSON: (i) ->
    data = @transformData i
    JSON.stringify User: data

  sendRequests: ->
    requests = for i in [1..@count]
      @wsapi.request
        body: @toJSON i

    Q.all(requests).then (results) =>
      @response.send (result.CreateResult for result in results)
    , (err) -> console.log 'error on requests', err
