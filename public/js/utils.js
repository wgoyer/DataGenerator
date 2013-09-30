(function() {
  $(function() {
    return $.ajaxSetup({
      type: 'post',
      dataType: 'json',
      success: function(res) {
        var error, result, status;
        if (res == null) {
          res = {
            msg: '',
            Errors: []
          };
        }
        result = res.CreateResult;
        status = '';
        if (result.msg != null) {
          status += "<p class=\"text-info\">" + result.msg + "</p>";
        }
        if (result.Errors != null) {
          status += ((function() {
            var _i, _len, _ref, _results;
            _ref = result.Errors;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              error = _ref[_i];
              _results.push('<p class="text-error">' + error + '</p>');
            }
            return _results;
          })()).join('');
        }
        return $('#status').html(status);
      }
    });
  });

}).call(this);
