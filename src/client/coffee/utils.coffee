# init code

@DataGenerator = {}

getOidFromRef = (ref) -> ref.match(/\d+$/)?[0]

$ ->
  $.ajaxSetup
    type: 'post'
    dataType: 'json'

  # load user -> user profile -> get default project
  $.ajax(
    type: 'get'
    url: '/users'
  ).then (res) ->
    window.DataGenerator.currentUser = res
    $('.current').html """
<p>Current user: #{res.User.EmailAddress}</p>
<p>Current project: #{res.UserProfile.DefaultProject._refObjectName}</p>
    """
    
  # load release dropdowns
  $.ajax(
    type: 'get'
    url: 'http://127.0.0.1:7001/slm/webservice/v2.0/release'
    xhrFields:
      withCredentials: true
  ).then (results) ->
    debugger
    console.log 'loading releases'