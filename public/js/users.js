(function() {
  $(function() {
    return $('#userSubmit').on('click', function(e) {
      var data;
      data = {};
      $('#users input').each(function(i, item) {
        return data[item.id] = item.value;
      });
      $.ajax;
      ({
        url: '/createUsers',
        data: data
      });
      return e.preventDefault();
    });
  });

}).call(this);
