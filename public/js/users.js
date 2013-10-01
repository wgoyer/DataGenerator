(function() {
  $(function() {
    return $('#userSubmit').on('click', function(e) {
      var data;
      $('#status').html('Loading...');
      data = {};
      $('#users input').each(function(i, item) {
        return data[item.getAttribute('data-field-name')] = item.value;
      });
      $.ajax({
        url: '/createUsers',
        data: data,
        success: function(results) {
          var error, result, status, _i, _len;
          status = '';
          for (_i = 0, _len = results.length; _i < _len; _i++) {
            result = results[_i];
            if (result.msg != null) {
              status += "<p class=\"text-info\">" + result.msg + "</p>";
            }
            if (result.Object != null) {
              status += '<p class="text-success">Created user: ' + result.Object.EmailAddress + '</p>';
            }
            if (result.Errors != null) {
              status += ((function() {
                var _j, _len1, _ref, _results;
                _ref = result.Errors;
                _results = [];
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                  error = _ref[_j];
                  _results.push('<p class="text-error">' + error + '</p>');
                }
                return _results;
              })()).join('');
            }
            status += '<hr>';
          }
          return $('#status').html(status.replace(/<hr>$/, ''));
        }
      });
      return e.preventDefault();
    });
  });

}).call(this);
