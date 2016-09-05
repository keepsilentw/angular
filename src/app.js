'use strict';

angular.module('app.common', [
  'app.httpProvider'
]);

angular.module('app.modules', [
  'modules.error',
  'modules.user',
  'modules.userDetail'
]);

angular.module('app.service', [
  'service.user'
]);

angular.module('app.directive', [
  'directive.selector'
]);

angular.module('app', [
  'angular-loading-bar',
  'hSweetAlert',
  'ngAnimate',
  'ngLocale',
  'ngRoute',
  'ui.bootstrap',
  'toaster',
  'app.common',
  'app.modules',
  'app.service'
]);
