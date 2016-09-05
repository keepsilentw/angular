angular.module('app').run(['$templateCache', function($templateCache) {$templateCache.put('error/error.html','\u8BF7\u6C42\u7684\u8D44\u6E90\u4E0D\u5B58\u5728');
$templateCache.put('user/user.html','<div class="container user-page">\n  <div class="panel panel-default">\n    <div class="panel-heading">\u7528\u6237\u7BA1\u7406</div>\n    <div class="panel-body">\n      <form name="retrievalForm" class="form-horizontal">\n        <div class="form-group col-xs-3">\n          <label class="control-label col-xs-4">\u5DE5\u53F7</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="userid">\n          </div>\n        </div>\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u5F00\u59CB\u65E5\u671F</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="start_date" ng-click="startDateOpen = 1" uib-datepicker-popup="yyyy-MM-dd" is-open="startDateOpen" close-text="\u5173\u95ED" current-text="\u4ECA\u5929" clear-text="\u6E05\u9664">\n          </div>\n        </div>\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u7ED3\u675F\u65E5\u671F</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="end_date" ng-click="endDateOpen = 1" uib-datepicker-popup="yyyy-MM-dd" is-open="endDateOpen" close-text="\u5173\u95ED" current-text="\u4ECA\u5929" clear-text="\u6E05\u9664">\n          </div>\n        </div>\n        <div class="form-group col-xs-2 text-right">\n          <button class="btn btn-primary" ng-click="retrieval()">\u68C0\u7D22</button>\n        </div>\n      </form>\n    </div>\n    <table class="table table-striped table-bordered table-hover">\n      <thead>\n        <tr>\n          <th>Num</th>\n          <th>\u59D3\u540D</th>\n          <th>\u5DE5\u53F7</th>\n          <th>\u624B\u673A\u53F7</th>\n          <th>\u90AE\u7BB1</th>\n          <th>\u90E8\u95E8</th>\n          <th>\u804C\u7EA7</th>\n          <th>\u5728\u804C\u72B6\u6001</th>\n          <th>\u64CD\u4F5C</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr ng-repeat="item in users">\n          <td>{{$index}}</td>\n          <td>{{item.name}}</td>\n          <td>{{item.id}}</td>\n          <td>{{item.mobile}}</td>\n          <td>{{item.email}}</td>\n          <td>{{item.department}}</td>\n          <td>{{transformRole(item.role)}}</td>\n          <td ng-class="{\'gray\': !item.valid}">{{item.valid ? \'\u5728\u804C\' : \'\u79BB\u804C\'}}</td>\n          <td>\n            <a class="operate" href="javascript:;" ng-click="edit(item.id)">\n              <i class="fa fa-edit"></i>\n            </a>\n            <a class="operate" href="javascript:;" ng-click="remove(item.id)">\n              <i class="fa fa-remove"></i>\n            </a>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n    <div class="text-center">\n      <div uib-pagination ng-model="current" total-items="total" items-per-page="limit" max-size="5" first-text="\u9996\u9875" last-text="\u672B\u9875" previous-text="\u4E0A\u4E00\u9875" next-text="\u4E0B\u4E00\u9875" boundary-links="true" rotate="false"></div>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('user/detail/detail.html','<div class="container user-page">\n  <div class="panel panel-default">\n    <div class="panel-heading">\n      <ol class="breadcrumb">\n        <li><a href="/#/user">\u7528\u6237\u7BA1\u7406</a></li>\n        <li class="active">\u7F16\u8F91\u7528\u6237</li>\n      </ol>\n    </div>\n    <div class="panel-body">\n      <form name="retrievalForm" class="form-horizontal">\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u5DE5\u53F7</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="params.userid" disabled>\n          </div>\n        </div>\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u59D3\u540D</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="params.name">\n          </div>\n        </div>\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u624B\u673A\u53F7</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="params.mobile">\n          </div>\n        </div>\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u804C\u7EA7</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="params.role" disabled>\n          </div>\n        </div>\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u90AE\u7BB1</label>\n          <div class="col-xs-8">\n            <input type="text" class="form-control" ng-model="params.email">\n          </div>\n        </div>\n        <div class="form-group col-xs-4">\n          <label class="control-label col-xs-4">\u5728\u804C\u72B6\u6001</label>\n          <div class="col-xs-8">\n            <select class="form-control" ng-model="params.valid" ng-options="vs.key as vs.val for vs in validStates"></select>\n          </div>\n        </div>\n      </form>\n    </div>\n    <div class="panel-footer text-right">\n      <button class="btn btn-default" ng-click="cancel()">\u53D6\u6D88</button>\n      <button class="btn btn-primary" ng-click="save()">\u4FDD\u5B58</button>\n    </div>\n  </div>\n</div>\n');
$templateCache.put('selector/selector.html','<div class="selector row">\n  <div class="label col-xs-1" ng-bind="label"></div>\n  <div class="all col-xs-1" ng-click="choose(item)" ng-class="{\'active\': item.val == selected}">\u5168\u90E8</div>\n  <div class="choices col-xs-10">\n    <div class="choice" ng-class="{\'active\': selected.indexOf(item.val)>=0}" ng-repeat="item in data" ng-bind="item.key" ng-click="choose(item)"></div>\n  </div>\n</div>\n');}]);