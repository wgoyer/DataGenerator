credentials = require('../credentials')

Q = require 'q'
ObjectCreator = require './ObjectCreator'

# WSAPI Users Class
module.exports = class UserCreator extends ObjectCreator

  fields: ["EmailAddress", "FirstName", "LastName", "DisplayName", "UserName"]
  uri: '/user/create'

  transformData: (i) ->
    data = super()
    
    if @count > 1
      data.EmailAddress = data.EmailAddress.replace /^([^@]+)/, '$1' + i
      data.UserName = data.UserName.replace /^([^@]+)/, '$1' + i

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