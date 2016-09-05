'use strict';

angular.module(
  'service.user', []
).factory('userService', [
  '$http',
  'api',
  function ($http, api) {
    return {
      fecthUsers: function (params) {
        return $http.get(api + '/api/user', {params: params});
      },
      fecthUser: function (userid) {
        return $http.get(api + '/api/user/' + userid);
      },
      updateUser: function (params) {
        return $http.post(api + '/api/user/edit', params);
      },
      removeUser: function (params) {
        return $http.post(api + '/api/user/remove', params);
      }
    };
  }
])
