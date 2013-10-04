# init code

@DataGenerator = {}

baseURI = 'http://127.0.0.1:7001'

wsBaseURI = 'http://127.0.0.1:7001/slm/webservice/v2.0'

@getOidFromRef = (ref) -> ref.match(/\d+$/)?[0]

@buildDetailUrl = (type, projectOid, oid) ->
  "#{baseURI}/#/#{projectOid}/detail/#{type}/#{oid}"

@getCurrentProjectOid = ->
  getOidFromRef DataGenerator.currentUser.UserProfile.DefaultProject._ref

@getCurrentWorkspaceOid = ->
  getOidFromRef DataGenerator.currentUser.UserProfile.DefaultWorkspace._ref

loadObjectDropdown = (url, dropdownSelector) ->
  # load release dropdowns
  $.ajax(
    type: 'get'
    url: url
    xhrFields:
      withCredentials: true
  ).then (results) ->
    html = '<option value="">No Entry</option>'

    for result in results.QueryResult.Results
      html += "<option value=\"#{getOidFromRef result._ref}\">#{result._refObjectName}</option>"

    $(dropdownSelector).html html

loadRallyDropdown = (url, dropdownSelector) ->
  # load release dropdowns
  $.ajax(
    type: 'get'
    url: url
    xhrFields:
      withCredentials: true
  ).then (results) ->
    html = '<option value="">No Entry</option>'

    for result in results.QueryResult.Results
      if result.StringValue
        html += "<option value=\"#{result.StringValue}\">#{result.StringValue}</option>"

    $(dropdownSelector).html html
  

$ ->
  $.ajaxSetup
    type: 'post'
    dataType: 'json'

  # load user -> user profile -> get default project
  $.ajax(
    type: 'get'
    url: '/users'
  ).then (res) ->
    DataGenerator.currentUser = res
    $('.current').html """
<p>Current user: #{res.User.EmailAddress}</p>
<p>Current project: #{res.UserProfile.DefaultProject._refObjectName}</p>
    """

    loadObjectDropdown """#{wsBaseURI}/release?query=(project.Name = "#{DataGenerator.currentUser.UserProfile.DefaultProject._refObjectName}")""", '#defectRelease'
    
    loadObjectDropdown """#{wsBaseURI}/iteration?query=(project.Name = "#{DataGenerator.currentUser.UserProfile.DefaultProject._refObjectName}")""", '#defectIteration'

    loadObjectDropdown """#{wsBaseURI}/release?query=(project.Name = "#{DataGenerator.currentUser.UserProfile.DefaultProject._refObjectName}")""", '#storyRelease'
    
    loadObjectDropdown """#{wsBaseURI}/iteration?query=(project.Name = "#{DataGenerator.currentUser.UserProfile.DefaultProject._refObjectName}")""", '#storyIteration'

    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12513/AllowedValues""", '#defectPriority'
    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12509/AllowedValues""", '#defectSeverity'
    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12511/AllowedValues""", '#defectEnvironments'
    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-27506/AllowedValues""", '#storyState'
