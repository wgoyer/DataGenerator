# init code
$ ->
  $.ajaxSetup
    type: 'post'
    dataType: 'json'
    success: (res = {msg: '', Errors: []}) ->

      result = res.CreateResult

      status = ''

      status += "<p class=\"text-info\">#{result.msg}</p>" if result.msg?

      status += ('<p class="text-error">' + error + '</p>' for error in result.Errors).join '' if result.Errors?

      $('#status').html status
