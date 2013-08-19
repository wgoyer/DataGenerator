# init code
$ ->
  $.ajaxSetup
    type: 'post'
    dataType: 'json'
    success: (res = '') ->
      $('#status').html """
        <p class="text-info">#{res.msg}</p>
        #{('<p class="text-error">' + error + '</p>' for error in res.errors).join ''}
      """
    
