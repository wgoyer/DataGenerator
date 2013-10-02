(function() {
  $(function() {
    return $.ajaxSetup({
      type: 'post',
      dataType: 'json'
    });
  });

}).call(this);
