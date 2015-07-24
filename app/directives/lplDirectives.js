
(function(module) {

	try {
		module = angular.module('lplDirectives');
	} catch(e) {
		module = angular.module('lplDirectives', ['lplDirectives-partials', 'lplCommon'])
	}

	module.directive('myd', function() {

		return {
			restrict: 'E',
			transclude: true,
			scope: {title: '@'},
			template: '<div style="width: 200px;"><h4>{{title}}</h4><div ng-transclude></div></div>',
		}
	})


})();
