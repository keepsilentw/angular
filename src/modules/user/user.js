'use strict';

angular.module(
  'modules.user', []
).controller('userCtrl', [
  '$scope',
  '$location',
  'toaster',
  'userService',
  'sweet',
  function ($scope, $location, toaster, userService, sweet) {
    $scope.current = 1;
    $scope.limit = 10;

    $scope.initData = function (params) {
      userService.fecthUsers(params).then(function (res) {
        $scope.users = res.data.data;
        $scope.total = res.data.count;
      });
    }

    $scope.users = [
      {
        id: '0001',
        name: 'sials',
        mobile: '13913177164',
        email: 'silas164@qq.com',
        role: 1,
        department: '研发部',
        valid: 1
      },
      {
        id: '0002',
        name: 'tom',
        mobile: '13913177165',
        email: 'tom165@163.com',
        role: 2,
        department: '产品部',
        valid: 0
      },
      {
        id: '0003',
        name: 'jack',
        mobile: '13913177166',
        email: 'jack166@gmail.com',
        role: 3,
        department: '设计部',
        valid: 0
      },
      {
        id: '0003',
        name: 'tony',
        mobile: '13913177167',
        email: 'tony167@icloud.com',
        role: 4,
        department: '财务部',
        valid: 1
      }
    ];
    $scope.total = $scope.users.length;
    $scope.roleMap = {
      1: 'p7',
      2: 'p6',
      3: 'p5',
      4: 'p4'
    }

    $scope.transformRole = function (role_id) {
      return $scope.roleMap[role_id];
    }

    $scope.retrieval = function () {
      if (!$scope.userid) {
        toaster.warning('请输入工号！');
        return;
      }
      if (!$scope.start_date) {
        toaster.warning('请输入开始日期！');
        return;
      }
      if (!$scope.end_date) {
        toaster.warning('请输入结束日期！');
        return;
      }
      if ($scope.start_date > $scope.end_date) {
        toaster.warning('开始日期不能大于结束日期！');
        return;
      }
      var params = {
        id: $scope.userid,
        start: moment($scope.start_date).format('YYYY-MM-DD'),
        end: moment($scope.end_date).format('YYYY-MM-DD')
      }
      $scope.initData(params);
    }

    $scope.edit = function (id) {
      $location.path('user/' + id);
    }

    $scope.remove = function (id) {
      sweet.show({
        title: '系统提醒',
        text: '确认删除该人员吗？',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }, function () {
        userService.removeUser({id: id}).then(function (res) {
          toaster.success('删除成功');
        })
      })
    }
  }
]);
