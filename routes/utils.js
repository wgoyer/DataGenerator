(function() {
  var Q, WsapiRequester, baseURI, qrequest, rallyAuth, request;

  Q = require('q');

  request = require('request');

  baseURI = require('../ignore/baseURI');

  rallyAuth = require('../ignore/rallyAuth');

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
          user: rallyAuth[0],
          pass: rallyAuth[1],
          sendImmediately: false
        }
      }).then(function(data) {
        var _ref;
        if (((_ref = data.OperationResult) != null ? _ref.SecurityToken : void 0) == null) {
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
        opt.uri = "" + _this.uri + "?key=" + token;
        opt.auth = {
          user: rallyAuth[0],
          pass: rallyAuth[1],
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
