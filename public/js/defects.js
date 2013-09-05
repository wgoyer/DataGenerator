(function() {
  $(function() {
    return $('#defectSubmit').on('click', function(e) {
      var data;
      data = {};
      data.defectPriority = $('#defectPriorityDropDown').val();
      data.defectSeverity = $('#defectSeverityDropDown').val();
      data.defectEnvironment = $('#defectEnvironments').val();
      $('#defects input').each(function(i, item) {
        return data[item.id] = item.value;
      });
      $.ajax({
        url: '/createDefects',
        data: data
      });
      return e.preventDefault();
    });
  });

}).call(this);