'use strict';

angular.module('app').run([
  '$rootScope',
  '$location',
  function ($rootScope, $location) {
    $rootScope.user = {
      name: '管理员'
    }

    $rootScope.logout = function () {
      alert('登出');
    }

    $rootScope.enterSearch = function (e) {
      if (e.keyCode == 13) $rootScope.globaleSearch($rootScope.searchKey);
    }

    $rootScope.globaleSearch = function (key) {
      console.log(key);
    }

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      document.querySelector('#loader').style.display = 'none';
    });
  }
]);
