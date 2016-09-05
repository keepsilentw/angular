'use strict';

angular.module(
  'modules.userDetail', []
).controller('userDetailCtrl', [
  '$scope',
  '$location',
  '$routeParams',
  'toaster',
  'userService',
  function ($scope, $location, $routeParams, toaster, userService) {
    $scope.params = {};
    $scope.params.userid = $routeParams.id;
    $scope.validStates = [
      {key: null, val: '请选择'},
      {key: 1, val: '在职'},
      {key: 0, val: '离职'}
    ];
    $scope.params.valid = null;

    $scope.initUser = function () {
      userService.fecthUser($scope.params.userid).then(function (res) {
        $scope.params = res.data.data;
      });
    }

    $scope.initUser();

    $scope.save = function () {
      userService.updateUser($scope.params).then(function () {
        toaster.success('更新成功');
      })
    }

    $scope.cancel = function () {
      $location.path('user');
    }
  }
]);
