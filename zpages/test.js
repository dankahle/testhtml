


var app = angular.module('app', ['restangular', 'ui.router', 'ngAnimate']);
app.run(function (Restangular, $state, $stateParams, $rootScope, $location) {
	Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
		console.log('error:', response)
		return true;
	});

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope.$location = $location;
	$rootScope.log = console.log.bind(console);

	$rootScope.$on('$stateChangeError', function (event, to, top, from, fromp, error) {
		console.log(error.stack);
	})
	$rootScope.$on('$stateChangeSuccess', function (event, to, top, from, fromp, error) {
		console.log('>> ' + to.name);
	})
})
app.config(function (RestangularProvider, $stateProvider, $urlRouterProvider) {
	RestangularProvider.setBaseUrl('http://localhost:3000/api');

	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home', {
			url: '/',
			views: {
				header: {templateUrl: 'zpages/home/header.html'},
				main: {templateUrl: 'zpages/home/main.html'}
			}
		})
		.state('searchr', {
			url: '/searchr',
			resolve: {
				results: function($q, $rootScope) {
					return $q.when($rootScope.searchTerm + ' results');
				}
			},
			views: {
				header: {templateUrl: 'zpages/searchr/header.html'},
				main: {
					controller: 'searchrMainCtrl',
					templateUrl: 'zpages/searchr/main.html'
				}
			}
		})


});

app.controller('ctrl', function ($scope, $state, $stateParams, Restangular) {

	$scope.navs = [
		{state: 'home', name: 'Home'},
		{state: 'searchr', name: 'Search'}
	]


})
