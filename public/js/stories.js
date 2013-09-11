(function() {
  $(function() {
    return $('#createStory').on('click', function(e) {
      var data;
      data = {};
      data.storyState = $('#storyStateDropDown').val();
      $('#stories input').each(function(i, item) {
        return data[item.id] = item.value;
      });
      $.ajax({
        url: '/createStory',
        data: data
      });
      return e.preventDefault();
    });
  });

}).call(this);