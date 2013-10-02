Q = require 'q'
request = require 'request'

{credentials, baseURI} = require '../credentials'

qrequest = (opt) ->
  deferred = Q.defer()
  request opt, (error, response, body) ->
    if error then deferred.reject error
    deferred.resolve body
  deferred.promise

class WsapiRequester

  constructor: (@uri) ->
    @token = @getSecurityToken()

  getSecurityToken: ->
    deferred = Q.defer()
    qrequest(
      uri: baseURI + '/security/authorize'
      json: true
      auth:
        user: credentials.username
        pass: credentials.password
        sendImmediately: false
    ).then (data) ->
      unless data.OperationResult?.SecurityToken? then deferred.reject 'Error getting security token'
      deferred.resolve data.OperationResult.SecurityToken
    deferred.promise

  request: (opt) ->
    Q.when @token, (token) =>
      opt.method = 'post'
      opt.json = true
      opt.uri = "#{baseURI}#{@uri}?key=#{token}"
      opt.auth =
        user: credentials.username
        pass: credentials.password
        sendImmediately: false
      qrequest opt


getPriority = ->
  uri = baseURI + '/attributedefinition/-12513/AllowedValues'
  genericApiCall(uri)

getSeverity = ->
  uri = baseURI + '/attributedefinition/-12509/AllowedValues'
  genericApiCall(uri)
  
getStoryState = ->
  uri = baseURI + '/attributedefinition/-27506/AllowedValues'
  genericApiCall(uri)
  
getDefectEnvironments = ->
  uri = baseURI + '/attributedefinition/-12511/AllowedValues'
  genericApiCall(uri)

genericApiCall = (uri) ->
  console.log 'doing genericApiCall', uri, credentials
  qrequest(
    uri: uri
    json: true
    auth:
      user: credentials.username
      pass: credentials.password
      sendImmediately: false
  )
    
  


module.exports =
  qrequest: qrequest
  WsapiRequester: WsapiRequester
  getPriority: getPriority
  getSeverity: getSeverity
  getStoryState: getStoryState
  getDefectEnvironments : getDefectEnvironments