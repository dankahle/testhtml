

var app = angular.module('project', ['restangular', 'ui.router']);

	app.config(function(RestangularProvider, $stateProvider, $urlRouterProvider ) {
		$urlRouterProvider.otherwise('/list');

		$stateProvider
			.state('list', {
				url: '/list',
				controller: 'listCtrl',
				templateUrl:'list.html'
			})
			.state('new', {
				url: '/new',
				controller: 'createCtrl',
				templateUrl: 'detail.html'
			})
			.state('edit', {
				url: '/edit/:id',
				controller: 'editCtrl',
				templateUrl: 'detail.html',
				resolve: {
					project: function (Restangular, $stateParams) {
						return Restangular.one('projects', $stateParams.id).get();
					}
				}
			});

		RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
		RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' })
		RestangularProvider.setRestangularFields({
			id: '_id.$oid'
		});

		RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

			if (operation === 'put') {
				elem._id = undefined;
				return elem;
			}
			return elem;
		})
	});


app.controller('listCtrl', function($scope, Restangular) {
	$scope.projects = Restangular.all("projects").getList().$object;
});


app.controller('createCtrl', function($scope, Restangular, $state) {
	$scope.save = function() {
		Restangular.all('projects').post($scope.project).then(function(project) {
			$state.go('list');
		});
	}
});

app.controller('editCtrl', function($scope, $location, Restangular, project, $state) {
	var original = project;
	$scope.project = Restangular.copy(original);


	$scope.isClean = function() {
		return angular.equals(original, $scope.project);
	}

	$scope.destroy = function() {
		original.remove().then(function() {
			$state.go('list');
		});
	};

	$scope.save = function() {
		$scope.project.put().then(function() {
			$state.go('list');
		});
	};
});
