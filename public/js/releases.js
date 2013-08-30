(function() {
  $(function() {
    return $('#releaseSubmit').on('click', function(e) {
      var data;
      data = {};
      data.releaseState = $('#rlsStateDropDown').val();
      $('#releases input').each(function(i, item) {
        return data[item.id] = item.value;
      });
      $.ajax({
        url: '/release',
        data: data
      });
      return e.preventDefault();
    });
  });

}).call(this);