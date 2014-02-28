# init code

@DataGenerator = {}

baseURI = 'http://127.0.0.1:7001'

wsBaseURI = 'http://127.0.0.1:7001/slm/webservice/v2.0'

@getOidFromRef = (ref) -> ref.match(/\d+$/)?[0]

@buildDetailUrl = (type, projectOid, oid) ->
  "#{baseURI}/#/#{projectOid}/detail/#{type}/#{oid}"

@getCurrentProjectOid = ->
  getOidFromRef DataGenerator.currentProjectOid

@getCurrentWorkspaceOid = ->
  getOidFromRef DataGenerator.currentWorkspaceOid

createObjectDropdown = (results, includeNoEntry = true) ->
  html = if includeNoEntry then '<option value="">No Entry</option>' else ''

  for result in results
    html += "<option value=\"#{getOidFromRef result._ref}\">#{result._refObjectName}</option>"

  html

loadObjectDropdown = (url, dropdownSelector, includeNoEntry) ->
  # load release dropdowns
  $.ajax(
    type: 'get'
    url: url
    xhrFields:
      withCredentials: true
  ).then (results) ->
    $(dropdownSelector).html createObjectDropdown results.QueryResult.Results, includeNoEntry

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

  loadObjectDropdown """#{wsBaseURI}/hierarchicalrequirement?query=(project.Name = "#{projectName}")""", '#taskParent', false

$ ->
  $.ajaxSetup
    type: 'post'
    dataType: 'json'

  workspacePromise = $.ajax
    type: 'get'
    url: "/workspace"

  workspacePromise.then (workspace) ->

    $('.current-workspace').html createObjectDropdown workspace.QueryResult.Results, false
    DataGenerator.currentWorkspaceOid = $('.current-workspace option:selected').val()

    userPromise = $.ajax
      type: 'get'
      url: '/users'

    projectPromise = $.ajax
      type: 'get'
      url: "/project"

    $.when(userPromise, projectPromise).then (user, project) ->

      $('.current-user').html user[0].User.EmailAddress
      $('.current-project').html createObjectDropdown project[0].QueryResult.Results, false

      DataGenerator.currentUser = user
      DataGenerator.currentProject = $('.current-project option:selected').text()
      DataGenerator.currentProjectOid = $('.current-project option:selected').val()

      $('.current-project').on 'change', (e) ->
        DataGenerator.currentProject = $('.current-project option:selected').text()
        DataGenerator.currentProjectOid = $('.current-project option:selected').val()
        loadProjectScopedDropdowns(DataGenerator.currentProject)

      loadProjectScopedDropdowns(DataGenerator.currentProject)

      loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12513/AllowedValues""", '#defectPriority'
      loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12509/AllowedValues""", '#defectSeverity'
      loadRallyDropdown """#{wsBaseURI}/attributedefinition/-12511/AllowedValues""", '#defectEnvironments'
      loadRallyDropdown """#{wsBaseURI}/attributedefinition/-27506/AllowedValues""", '#storyState'