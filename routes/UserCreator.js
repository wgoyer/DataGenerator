(function() {
  var ObjectCreator, Q, UserCreator, baseURI, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  baseURI = require('../ignore/baseURI');

  Q = require('q');

  ObjectCreator = require('./ObjectCreator');

  module.exports = UserCreator = (function(_super) {
    __extends(UserCreator, _super);

    function UserCreator() {
      _ref = UserCreator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    UserCreator.prototype.fields = ["EmailAddress", "FirstName", "LastName", "DisplayName", "UserName"];

    UserCreator.prototype.uri = baseURI + '/user/create';

    UserCreator.prototype.transformData = function(i) {
      var data;
      data = UserCreator.__super__.transformData.call(this);
      if (this.count > 1) {
        data.EmailAddress = data.EmailAddress.replace(/^([^@]+)/, '$1' + i);
        data.UserName = data.UserName.replace(/^([^@]+)/, '$1' + i);
      }
      return data;
    };

    UserCreator.prototype.toJSON = function(i) {
      var data;
      data = this.transformData(i);
      return JSON.stringify({
        User: data
      });
    };

    UserCreator.prototype.sendRequests = function() {
      var i, requests,
        _this = this;
      requests = (function() {
        var _i, _ref1, _results;
        _results = [];
        for (i = _i = 1, _ref1 = this.count; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 1 <= _ref1 ? ++_i : --_i) {
          _results.push(this.wsapi.request({
            body: this.toJSON(i)
          }));
        }
        return _results;
      }).call(this);
      return Q.all(requests).then(function(results) {
        var result;
        return _this.response.send((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = results.length; _i < _len; _i++) {
            result = results[_i];
            _results.push(result.CreateResult);
          }
          return _results;
        })());
      }, function(err) {
        return console.log('error on requests', err);
      });
    };

    return UserCreator;

  })(ObjectCreator);

}).call(this);
