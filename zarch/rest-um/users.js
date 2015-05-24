
(function() {

	angular.module('app')
		.factory('$users', function(Restangular, $state, $stateParams, $rootScope, $urlPaths, $http) {

			var exp = {};

			exp.getAll = function() {
				return Restangular.all('users').getList();
			};

			exp.getOne = function(userId) {
				return Restangular.one('users', userId).get()
			};

			exp.add = function(user) {
				return Restangular.all('users').post({name: user.name, age: user.age});
			};

			exp.update = function(user) {
				if(user.put)
					return user.put();
				else {
					return $http.put($urlPaths.api + '/users/' + user.id, user).then(function(response) {
						return response.data;
					});

/*             // this is stupid, 2 calls to the server instea of one
					this.getOne(user.id).then(function(retUser) {
						_.extend(retUser, user);
						retUser.put();
					 })
*/
				}

			};

			exp.remove = function(user) {
				if (user.remove)
					return user.remove();
				else {
					return $http.delete($urlPaths.api + '/users/' + user.id).then(function (response) {
						return response.data;
					});
				}
			}

			exp.getAllMessages = function(user) {
				return user.getList('messages');
			};

			exp.getOneMessage = function(user, messageId) {
				return user.one('messages', messageId).get()
			};

			exp.addMessage = function(message, user, userId) {
				var _message = {message: message.message};
				if(user.post)
					return user.post('messages', _message);
				else {
					return $http.post($urlPaths.api + '/users/' + userId + '/messages', _message)
						.then(function(response) {
							return response.data;
						})
				}
			};

			exp.updateMessage = function(message, userId) {
				var _message = {message: message.message};
				if(message.put)
					return message.put()
				else {
					return $http.put($urlPaths.api + '/users/' + userId + '/messages/' + message.id, _message)
						.then(function(response) {
							return response.data;
						})
				}
			};

			exp.removeMessage = function(message, userId) {
				if(message.remove)
					return message.remove()
				else {
					return $http.put($urlPaths.api + '/users/' + userId + '/messages/' + message.id, _message)
						.then(function(response) {
							return response.data;
						})
				}
			};

			return exp;
		})
})()