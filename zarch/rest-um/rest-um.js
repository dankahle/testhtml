
(function() {

	var app = angular.module('app', ['ngAnimate', 'restangular', 'ui.router', 'ct.ui.router.extras.sticky', 'ct.ui.router.extras.dsr']);

	app.run(function(Restangular, $rootScope, $state, $stateParams, $location) {
		Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
			console.log('error:', response)
			return true;
		});

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.$location = $location;
		$rootScope.log = console.log.bind(console);

		$rootScope.$on('$stateChangeError', function(event, to, top, from, fromp, error) {
			console.log(error.stack);
		})
		$rootScope.$on('$stateChangeSuccess', function(event, to, top, from, fromp, error) {
			console.log('>> ' + to.name);
		})
	})
	app.config(function(RestangularProvider, $stateProvider, $urlRouterProvider) {

		RestangularProvider.setBaseUrl('http://localhost:3000/api');

		//$urlRouterProvider.otherwise()
		$stateProvider
			.state('home', {
				url: '/'
			})
			.state('add', {
				url: '/add',
				controller: 'userAddCtrl',
				templateUrl: 'userTemp'
			})
			.state('user', {
				abstract: true,
				url: '/user/{userId:int}',
				template: '<ui-view></ui-view>',
				resolve: {
					user: function(Restangular, $stateParams) {
						return Restangular.one('users', $stateParams.userId).get();
					}
				}
			})
			.state('user.edit', {
				url: '/edit',
				controller: 'userEditCtrl',
				templateUrl: 'userTemp'
			})
			.state('user.message', {
				url: '/messages',
				controller: 'messagesCtrl',
				templateUrl: 'messagesTemp'
			})
			.state('user.message.add', {
				url: '/add',
				controller: 'messageAddCtrl',
				templateUrl: 'messageTemp'
			})
			.state('user.message.edit', {
				url: '/{messageId:int}/edit',
				resolve: {
					message: function(user, $stateParams) {
						return user.one('messages', $stateParams.messageId).get();
					}
				},
				controller: 'messageEditCtrl',
				templateUrl: 'messageTemp'
			})
	})

	app.controller('bodyCtrl', function ($scope, Restangular) {
		$scope.users = [];

		$scope.refreshUsers =  refreshUsers = function() {
			Restangular.all('users').getList().then(function(users) {

				// remove from scope.users what's not in users
				$scope.users.forEach(function(v) {
					if(!_.find(users, {id: v.id}))
						_.remove($scope.users, v);
				});
				// update data for existing users
				$scope.users.forEach(function(v) {
					var user = _.find(users, {id: v.id})
					v.name = user.name;
					v.age = user.age;
				});
				// add what's in users and not in scope.users
				users.forEach(function(v) {
					if(!_.find($scope.users, {id: v.id}))
						$scope.users.push(v);
				});
				$scope.users.sort(function(a,b) {
					if(a.name < b.name)
						return -1;
					if(a.name > b.name)
						return 1;
					return 0;
				});


//				$scope.users = users;
			})
		};

		$scope.removeUser = function(user) {
			user.remove().then(function() {
				refreshUsers();
			})
		}

		refreshUsers()
	})

	app.controller('userAddCtrl', function($scope, Restangular) {
		$scope.mode = 'add';
		$scope.submit = function() {
			Restangular.all('users').post({name: $scope.user.name, age: $scope.user.age}).then(function() {
				$scope.refreshUsers();
			})
		}
		$('#user-name').focus()
	})

	app.controller('userEditCtrl', function($scope, user) {
		$scope.mode = 'edit';
		$scope.user = user;
		$scope.submit = function() {
			user.put().then(function() {
				$scope.refreshUsers();
			})
		}
		$('#user-name').focus()
	})
	app.controller('messagesCtrl', function($scope, user) {

		$scope.refreshMessages = refreshMessages = function() {
			user.getList('messages').then(function(messages) {
				$scope.messages = messages.reverse();
			})
		}

		$scope.removeMessage = function(message) {
			user.customDELETE('messages/' + message.id).then(function() {
				_.remove($scope.messages, message);
			})
		}

		refreshMessages();
	})

	app.controller('messageAddCtrl', function($scope, user) {
		$scope.mode = 'Add';
		$scope.submit = function() {
			user.post('messages', {message: $scope.message.message}).then(function(message) {
				$scope.messages.unshift(message)
			})
		}
		$('#message').focus()
	})

	app.controller('messageEditCtrl', function($scope, message) {
		$scope.mode = 'Edit';
		$scope.message = message;
		$scope.submit = function() {
			message.put().then(function() {
				$scope.refreshMessages();
			})
		}
		$('#message').focus()
	})



})() // iife


