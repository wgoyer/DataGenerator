
$ ->
  $('#storySubmit').on 'click', (e) ->

    $('#status').html 'Loading...'

    data = {Project: DataGenerator.currentProjectOid}
    $('#stories input, #stories select').each (i, item) ->
      data[item.getAttribute('data-field-name')] = item.value

    if $('#stories .jacksonize').is(':checked')
      jackson = jacksonize()
      data.Name = jackson.title
      data.Description = jackson.description

    $.ajax(
      url: '/story'
      data: data
    ).then (results) ->
      status = ''

      for result in results

        status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?

        status += """<p class="text-success">Created story: <a target="_blank" href="#{buildDetailUrl 'userstory', getCurrentProjectOid(), getOidFromRef result.Object._ref}">#{result.Object.FormattedID}</a></p>"""  if result.Object?

        status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?

        status += '<hr>'

      $('#status').html status.replace /<hr>$/, ''

    e.preventDefault()
