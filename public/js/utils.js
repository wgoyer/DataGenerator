(function() {
  var getOidFromRef;

  this.DataGenerator = {};

  getOidFromRef = function(ref) {
    var _ref;
    return (_ref = ref.match(/\d+$/)) != null ? _ref[0] : void 0;
  };

  $(function() {
    $.ajaxSetup({
      type: 'post',
      dataType: 'json'
    });
    $.ajax({
      type: 'get',
      url: '/users'
    }).then(function(res) {
      window.DataGenerator.currentUser = res;
      return $('.current').html("<p>Current user: " + res.User.EmailAddress + "</p>\n<p>Current project: " + res.UserProfile.DefaultProject._refObjectName + "</p>");
    });
    return $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:7001/slm/webservice/v2.0/release',
      xhrFields: {
        withCredentials: true
      }
    }).then(function(results) {
      debugger;
      return console.log('loading releases');
    });
  });

}).call(this);
