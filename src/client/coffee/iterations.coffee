$ ->
  $('#iterationSubmit').on 'click', (e) ->

    data = {}
    $('#iterations input').each (i, item) ->
      data[item.getAttribute('data-field-name')] = item.value

    $('#iterations select').each (i, item) ->
      data[item.getAttribute('data-field-name')] = item.value

    $.ajax(
      url: '/iteration'
      data: data
    ).then (results) ->
        status = ''

        for result in results

          status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?

          status += "<p class=\"text-success\">Created iteration: #{result.Object.Name}</p>"  if result.Object?

          status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?

          status += '<hr>'

        $('#status').html status.replace /<hr>$/, ''

    e.preventDefault()
