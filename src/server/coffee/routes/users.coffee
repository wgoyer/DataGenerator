UserCreator = require '../rally_api/UserCreator'

exports.createUsers = (req, response) ->
  
  new UserCreator(req.body, response).sendRequests()
  
  
  

ObjectReader = require '../rally_api/ObjectReader'

baseURI = require('../credentials').baseURI

RallyURL = require('../rally_api/utils/RallyURL')

class UserReader extends ObjectReader
  uri: '/user'
  
  sendRequest: ->
    @wsapi.request(
      method: 'get'
    ).then (userResults) =>
      @wsapi.request(
        method: 'get'
        uri: "#{baseURI}/userProfile/#{RallyURL.getOidFromRef userResults.User.UserProfile._ref}"
      ).then (profileResults) =>      
        @response.send User: userResults.User, UserProfile: profileResults.UserProfile

exports.read = (req, response) ->
  
  new UserReader(req.body, response).sendRequest()