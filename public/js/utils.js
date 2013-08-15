(function() {
  $(function() {
    return $.ajaxSetup({
      type: 'post',
      dataType: 'json',
      success: function(res) {
        var error;
        if (res == null) {
          res = '';
        }
        return $('#status').html("<p class=\"text-info\">" + res.msg + "</p>\n" + (((function() {
          var _i, _len, _ref, _results;
          _ref = res.errors;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            error = _ref[_i];
            _results.push('<p class="text-error">' + error + '</p>');
          }
          return _results;
        })()).join('')));
      }
    });
  });

}).call(this);
