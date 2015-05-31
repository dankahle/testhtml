
angular.module('app')
.directive('landingDirective', function() {
		return {
			templateUrl: 'landingDirective.html',
			link: function($scope, elem, attr) {
				elem.css('color', 'blue');
			}
		}
	})
	.run(function($templateCache) {
		$templateCache.put('landingDirective.html', '<div>landing directive temp cache</div>')
	})

