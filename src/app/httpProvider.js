'use strict';

angular.module('app.httpProvider', []).config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }
]).factory('httpInterceptor', [
  '$q',
  '$rootScope',
  '$location',
  'toaster',
  function ($q, $rootScope, $location, toaster) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        var token = localStorage.getItem('x-token');
        var expiration = localStorage.getItem('token-expiration');
        var now = (new Date()).valueOf();

        if (expiration && now >= expiration) {
          toaster.error('身份过期，请重新登录');
          $location.path('/login');
          localStorage.removeItem('mobile');
          localStorage.removeItem('x-token');
          localStorage.removeItem('token-expiration');
        }

        if (token) config.headers['x-token'] = token;
        return config;
      },
      response: function (res) {
        var defer = $q.defer();
        var content_type = res.headers['Content-Type'];
        if (content_type != 'application/json') return res;

        if (res.data.code == 200) {
          defer.resolve(res.data.data);
        } else {
          toaster.error(res.data.msg);
          $q.reject(res);
        }
        return defer.promise;
      },
      responseError: function (res) {
        var st = res.status;
        switch (st) {
          case 403:
            $location.path('/403');
            break;
          case 404:
            $location.path('/404');
            break;
          case 401:
            toaster.error('身份认证无效，请重新登录');
            $location.path('/login');
            localStorage.removeItem('mobile');
            localStorage.removeItem('x-token');
            localStorage.removeItem('token-expiration');
            break;
          case 500:
            toaster.error('系统错误');
            break;
          default:
            toaster.error('系统错误');
        }
        return $q.reject(res);
      }
    }
  }
])
