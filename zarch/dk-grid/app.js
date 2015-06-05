
var app = angular.module('app', ['restangular', 'ui.router', 'ngAnimate', 'dkGrid']);

app.config(function (RestangularProvider, $stateProvider, $urlRouterProvider) {
	RestangularProvider.setBaseUrl('http://localhost:3000/api');
});

app.run(function ($rootScope) {
	$rootScope.moment = moment;
});

app.directive('stdDate', function () {
	return {
		require: 'ngModel',
		link: function (scope, elme, attr, ctrl) {
			ctrl.$formatters.push(function (val) {
				return moment(val).format('L');
			})
			ctrl.$parsers.push(function (val) {
				return new Date(val);
			})
		}
	}
})


/*
 todo:
 * delete needs to stay on same page, but might not be there after delete. What to do?
 */

app.controller('ctrl', function ($scope, userRepo) {
	$scope.dkGridRepo = userRepo;

	$scope.dkGridHeaders = [
		{name: '', title: ''},
		{name: 'name', title: 'Name'},
		{name: 'age', title: 'Age'},
		{name: 'sex', title: 'Sex'},
		{name: 'bday', title: 'Birthday'},
		{name: '', title: ''}
	]


})
