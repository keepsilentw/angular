'user strict';

angular.module(
  'directive.selector', []
).directive('multiSelector', function () {
  return {
    restrict: 'EA',
    scope: {
      data: "=",
      selected: "=",
    },
    templateUrl: 'selector/selector.html',
    replace: true,
    link: function ($scope, $element, $attrs) {

      $scope.label = $attrs.label;
      $scope.item = {'key': '全部', 'val': undefined};

      $scope.choose = function (item) {
        if (item.val == undefined) {
          $scope.selected = undefined;
          return;
        }
        if ($scope.selected == undefined) {
          $scope.selected = [];
        }
        if (_.contains($scope.selected, item.val)) {
          $scope.selected = _.without($scope.selected, item.val);
          if ($scope.selected.length == 0) $scope.selected = undefined;
        } else {
          $scope.selected = _.union($scope.selected, [item.val]);
        }
      }

      $scope.$watch('selected', function (nv, ov) {
        if (nv == ov) return;
        $scope.$emit('selected');
      })
    }
  }
})