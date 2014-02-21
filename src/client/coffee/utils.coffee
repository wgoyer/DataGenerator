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

createObjectDropdown = (results, includeNoEntry = true) ->
  html = if includeNoEntry then '<option value="">No Entry</option>' else ''

  for result in results
    html += "<option value=\"#{getOidFromRef result._ref}\">#{result._refObjectName}</option>"

  html

loadObjectDropdown = (url, dropdownSelector) ->
  # load release dropdowns
  $.ajax(
    type: 'get'
    url: url
    xhrFields:
      withCredentials: true
  ).then (results) ->
    $(dropdownSelector).html createObjectDropdown results.QueryResult.Results

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

loadProjectScopedDropdowns = (projectName) ->
  loadObjectDropdown """#{wsBaseURI}/release?query=(project.Name = "#{projectName}")""", '#defectRelease'

  loadObjectDropdown """#{wsBaseURI}/iteration?query=(project.Name = "#{projectName}")""", '#defectIteration'

  loadObjectDropdown """#{wsBaseURI}/release?query=(project.Name = "#{projectName}")""", '#storyRelease'

  loadObjectDropdown """#{wsBaseURI}/iteration?query=(project.Name = "#{projectName}")""", '#storyIteration'

  loadObjectDropdown """#{wsBaseURI}/hierarchicalrequirement?query=(project.Name = "#{projectName}")""", '#taskParent'

$ ->
  $.ajaxSetup
    type: 'post'
    dataType: 'json'

  userPromise = $.ajax
    type: 'get'
    url: '/users'

  projectPromise = $.ajax
    type: 'get'
    url: '/project'

  $.when(userPromise, projectPromise).then (user, project) ->

    $('.current-user').html user[0].User.EmailAddress
    $('.current-project').html createObjectDropdown project[0].QueryResult.Results, false

    DataGenerator.currentUser = user
    DataGenerator.currentProject = $('.current-project option:selected').text()

    $('.current-project').on 'change', (e) ->
      DataGenerator.currentProject = $('.current-project option:selected').text()
      loadProjectScopedDropdowns(DataGenerator.currentProject)

    loadProjectScopedDropdowns(DataGenerator.currentProject)

    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12513/AllowedValues""", '#defectPriority'
    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12509/AllowedValues""", '#defectSeverity'
    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12511/AllowedValues""", '#defectEnvironments'
    loadRallyDropdown """#{wsBaseURI}/attributedefinition/-27506/AllowedValues""", '#storyState'