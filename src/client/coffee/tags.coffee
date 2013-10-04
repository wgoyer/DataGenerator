$ ->
  $('#tagSubmit').on 'click', (e) ->
    
    $('#status').html 'Loading...'

    data = {}
    $('#tags input').each (i, item) ->
      data[item.getAttribute('data-field-name')] = item.value
      
    if $('#tags .jacksonize').is(':checked')
      data.Name = jacksonize().title    

    $.ajax(
      url: '/tag'
      data: data
    ).then (results) ->
      status = ''

      for result in results
        
        status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?  
        
        status += """<p class="text-success">Created tag: <a target="_blank" href="#{buildDetailUrl 'workspace', getCurrentProjectOid(), getCurrentWorkspaceOid()}/tags">#{result.Object.Name}</p>"""  if result.Object?

        status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?
          
        status += '<hr>'

      $('#status').html status.replace /<hr>$/, ''

    e.preventDefault()
