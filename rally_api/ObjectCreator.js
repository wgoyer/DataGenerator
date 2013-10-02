(function() {
  var ObjectCreator, WsapiRequester;

  WsapiRequester = require('./utils').WsapiRequester;

  module.exports = ObjectCreator = (function() {
    function ObjectCreator(data, response) {
      this.data = data;
      this.response = response;
      this.count = this.data.count;
      this.wsapi = new WsapiRequester(this.uri);
    }

    ObjectCreator.prototype.transformData = function() {
      var data, field, _i, _len, _ref;
      data = {};
      _ref = this.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        data[field] = this.data[field];
      }
      return data;
    };

    return ObjectCreator;

  })();

}).call(this);
