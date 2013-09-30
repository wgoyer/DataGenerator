$ ->
  $('#userSubmit').on 'click', (e) ->
    
    $('#status').html 'Loading...'

    data = {}
    $('#users input').each (i, item) ->
      data[item.id] = item.value

    $.ajax
      url: '/createUsers'
      data: data
      success: (results) ->
        
        status = ''

        for result in results
          
          status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?  
          
          status += '<p class="text-success">Created user: ' + result.Object.EmailAddress + '</p>'  if result.Object?

          status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?
            
          status += '<hr>'

        $('#status').html status

    e.preventDefault()
