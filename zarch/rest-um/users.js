(function () {

	angular.module('app')
		.factory('$users', function (Restangular, $state, $stateParams, $rootScope, $urlPaths, $http) {

			var exp = {};

			exp.getAll = function () {
				return $http.get($urlPaths.api + '/users')
					.then(function(resp) {
						return resp.data;
					})
			};

			exp.getOne = function (userId) {
				return $http.get($urlPaths.api + '/users/' + userId)
					.then(function(resp) {
						return resp.data;
					})
			};

			exp.add = function (user) {
				return $http.post($urlPaths.api + '/users', {name: user.name, age: user.age})
					.then(function(resp) {
						return resp.data;
					})
			};

			exp.update = function (user) {
				return $http.put($urlPaths.api + '/users/' + user.id, user)
					.then(function(resp) {
						return resp.data;
					})
			};

			exp.remove = function (userId) {
				return $http.delete($urlPaths.api + '/users/' + userId)
					.then(function(resp) {
						return resp.data;
					})
			}

			exp.getAllMessages = function (user) {
				return user.getList('messages');
			};

			exp.getOneMessage = function (user, messageId) {
				return user.one('messages', messageId).get()
			};

			exp.addMessage = function (user, message) {
				return user.post('messages', message)
					.then(function(message) {
						// restangular restangularizes the return message, but for some reason doens't
						// set it's parent to user, so we have to restangularize it again, this time with a parent
						Restangular.restangularizeElement(user, message, 'messages');
						return message;
					})
			};

			exp.updateMessage = function (message) {
				return message.put()
			};

			exp.removeMessage = function (message) {
				return message.remove()
			};

			return exp;
		})
})()