$ ->
  $('#defectSubmit').on 'click', (e) ->
    
    $('#status').html 'Loading...'

    data = {}
    $('#defects input, #defects select').each (i, item) ->
      if item.value
        data[item.getAttribute('data-field-name')] = item.value

    $.ajax(
      url: '/defect'
      data: data
    ).then (results) ->
      status = ''

      for result in results
        
        status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?  
        
        status += """<p class="text-success">Created defect: <a target="_blank" href="#{buildDetailUrl 'defect', getCurrentProjectOid(), getOidFromRef result.Object._ref}">#{result.Object.FormattedID}</a></p>"""  if result.Object?
          
        status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?
          
        status += '<hr>'

      $('#status').html status.replace /<hr>$/, ''

    e.preventDefault()
