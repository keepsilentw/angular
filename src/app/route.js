'use strict';

angular.module('app').config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/user', {
      controller: 'userCtrl',
      templateUrl: 'user/user.html'
    }).when('/user/:id', {
      controller: 'userDetailCtrl',
      templateUrl: 'user/detail/detail.html'
    }).when('/error', {
      controller: 'errorCtrl',
      templateUrl: 'error/error.html'
    })
    .otherwise({redirectTo: '/user'});
  }
]);
