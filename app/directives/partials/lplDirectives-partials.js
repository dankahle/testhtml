(function(module) {
try {
  module = angular.module('lplDirectives-partials');
} catch (e) {
  module = angular.module('lplDirectives-partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/lplDirectives-tabs-pane.html',
    '<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('lplDirectives-partials');
} catch (e) {
  module = angular.module('lplDirectives-partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/lplDirectives-tabs.html',
    '<div>\n' +
    '	<ul class="nav nav-tabs">\n' +
    '		<li ng-repeat="pane in panes" ng-class="{active: pane.selected}">\n' +
    '			<a href="#" ng-click="selectPane(pane)">{{pane.title}}</a>\n' +
    '		</li>\n' +
    '	</ul>\n' +
    '	<div class="tab-content" ng-transclude><div>\n' +
    '</div>');
}]);
})();
