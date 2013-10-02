(function() {
  var Q, WsapiRequester, baseURI, credentials, qrequest, request, _ref;

  Q = require('q');

  request = require('request');

  _ref = require('../credentials'), credentials = _ref.credentials, baseURI = _ref.baseURI;

  qrequest = function(opt) {
    var deferred;
    deferred = Q.defer();
    request(opt, function(error, response, body) {
      if (error) {
        deferred.reject(error);
      }
      return deferred.resolve(body);
    });
    return deferred.promise;
  };

  WsapiRequester = (function() {
    function WsapiRequester(uri) {
      this.uri = uri;
      this.token = this.getSecurityToken();
    }

    WsapiRequester.prototype.getSecurityToken = function() {
      var deferred;
      deferred = Q.defer();
      qrequest({
        uri: baseURI + '/security/authorize',
        json: true,
        auth: {
          user: credentials.username,
          pass: credentials.password,
          sendImmediately: false
        }
      }).then(function(data) {
        var _ref1;
        if (((_ref1 = data.OperationResult) != null ? _ref1.SecurityToken : void 0) == null) {
          deferred.reject('Error getting security token');
        }
        return deferred.resolve(data.OperationResult.SecurityToken);
      });
      return deferred.promise;
    };

    WsapiRequester.prototype.request = function(opt) {
      var _this = this;
      return Q.when(this.token, function(token) {
        opt.method = 'post';
        opt.json = true;
        opt.uri = "" + baseURI + _this.uri + "?key=" + token;
        opt.auth = {
          user: credentials.username,
          pass: credentials.password,
          sendImmediately: false
        };
        return qrequest(opt);
      });
    };

    return WsapiRequester;

  })();

  module.exports = {
    qrequest: qrequest,
    WsapiRequester: WsapiRequester
  };

}).call(this);
