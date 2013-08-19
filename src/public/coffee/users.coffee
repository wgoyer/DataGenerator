$ ->
  $('#userSubmit').on 'click', (e) ->
    
    data = {}
    $('#users input').each (i, item) ->
      data[item.id] = item.value
    
    $.ajax
      url: '/createUsers'
      data: data

    e.preventDefault()