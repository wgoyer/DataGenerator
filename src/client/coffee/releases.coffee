$ ->
  $('#releaseSubmit').on 'click', (e) ->

    data = {}
    $('#releases input').each (i, item) ->
      data[item.getAttribute('data-field-name')] = item.value

    $('#releases select').each (i, item) ->
      data[item.getAttribute('data-field-name')] = item.value
      
    if $('#releases .jacksonize').is(':checked')
      jackson = jacksonize()
      data.Name = jackson.title
      data.Theme = jackson.description

    $.ajax(
      url: '/release'
      data: data
    ).then (results) ->
        status = ''

        for result in results

          status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?

          status += """<p class=\"text-success\">Created release: <a target="_blank" href="#{buildDetailUrl 'release', getCurrentProjectOid(), getOidFromRef result.Object._ref}">#{result.Object.Name}</a></p>"""  if result.Object?

          status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?

          status += '<hr>'

        $('#status').html status.replace /<hr>$/, ''

    e.preventDefault()
