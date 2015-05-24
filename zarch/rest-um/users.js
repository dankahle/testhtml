(function () {

	angular.module('app')
		.factory('$users', function (Restangular, $state, $stateParams, $rootScope, $urlPaths) {

			var exp = {};

			exp.getAll = function () {
				return Restangular.all('users').getList();
			};

			exp.getOne = function (userId) {
				return Restangular.one('users', userId).get();
			};

			exp.add = function (user) {
				return Restangular.all('users').post({name: user.name, age: user.age});
			};

			exp.update = function (user) {
				return user.put();
			};

			exp.remove = function (user) {
				return user.remove();
			}

			exp.getAllMessages = function (user) {
				return user.getList('messages');
			};

			exp.getOneMessage = function (user, messageId) {
				return user.one('messages', messageId).get()
			};

			exp.addMessage = function (user, message) {
				return user.post('messages', message)
					.then(function (message) {
						// restangular fails to set parentResouce, if you try to delete right after
						// adding, it will fail as it doesn't have a user parent
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