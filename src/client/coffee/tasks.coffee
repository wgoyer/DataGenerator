$ ->
  $('#taskSubmit').on 'click', (e) ->

    $('#status').html 'Loading...'

    data = {}
    $('#tasks input, #tasks select').each (i, item) ->
      data[item.getAttribute('data-field-name')] = item.value

    if $('#tasks .jacksonize').is(':checked')
      data.Name = jacksonize().title

    $.ajax(
      url: '/task'
      data: data
    ).then (results) ->
      status = ''

      for result in results

        status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?

        status += """<p class="text-success">Created task: <a target="_blank" href="#{buildDetailUrl 'task', getCurrentProjectOid(), getOidFromRef result.Object._ref}">#{result.Object.FormattedID}</a></p>"""  if result.Object?

        status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?

        status += '<hr>'

      $('#status').html status.replace /<hr>$/, ''

    e.preventDefault()
