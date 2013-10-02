(function() {
  $(function() {
    return $('#iterationSubmit').on('click', function(e) {
      var data;
      data = {};
      $('#iterations input').each(function(i, item) {
        return data[item.id] = item.value;
      });
      $('#iterations select').each(function(i, item) {
        return data[item.id] = item.value;
      });
      $.ajax({
        url: '/iteration',
        data: data
      });
      return e.preventDefault();
    });
  });

}).call(this);
