$ ->
  $('#iterationSubmit').on 'click', (e) ->

    data = {}
    $('#iterations input').each (i, item) ->
      data[item.id] = item.value
      
	$.ajax
  		url: '/iteration'
  		data: data

	e.preventDefault()