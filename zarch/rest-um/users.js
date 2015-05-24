(function () {

angular.module('app')
.factory('$users', function ($urlPaths, $http, $q) {

	var exp = {};

	exp.getAll = function () {
		return $http.get($urlPaths.api + '/users')
			.then(function (resp) {
				return resp.data;
			})
	};

	exp.getOne = function (userId) {
		return $http.get($urlPaths.api + '/users/' + userId)
			.then(function (resp) {
				return resp.data;
			})
	};

	exp.add = function (user) {
		return $http.post($urlPaths.api + '/users', {name: user.name, age: user.age})
			.then(function (resp) {
				return resp.data;
			})
	};

	exp.update = function (user) {
		return $http.put($urlPaths.api + '/users/' + user.id, user)
			.then(function (resp) {
				return resp.data;
			})
	};

	exp.remove = function (userId) {
		return $http.delete($urlPaths.api + '/users/' + userId)
			.then(function (resp) {
				return resp.data;
			})
	}

	exp.getAllMessages = function (userId) {
		return $http.get($urlPaths.api + '/users/' + userId + '/messages')
			.then(function (resp) {
				return resp.data;
			})
	};

	exp.getOneMessage = function (userId, messageId) {
		return $http.get($urlPaths.api + '/users/' + userId + '/messages/' + messageId)
			.then(function (resp) {
				return resp.data;
			})
	};

	exp.addMessage = function (userId, message) {
		return $http.post($urlPaths.api + '/users/' + userId + '/messages', message)
			.then(function (resp) {
				return resp.data;
			})
	};

	exp.updateMessage = function (userId, message) {
		return $http.put($urlPaths.api + '/users/' + userId + '/messages/' + message.id, message)
			.then(function (resp) {
				var count = resp.data.count;
				if (count == 0)
					return $q.reject('count=0')
				else
					return resp.data;
			})
	};

	exp.removeMessage = function (userId, messageId) {
		return $http.delete($urlPaths.api + '/users/' + userId + '/messages/' + messageId)
			.then(function (resp) {
				return resp.data;
			})
	};

	return exp;
})
})()