
angular.module('app')
	.factory('userRepo', function ($http) {
	var baseUrl = 'http://localhost:3000/api/users';
	var exp = {};

	exp.getAll = function () {
		return $http.get(baseUrl);
	};

	exp.getPage = function (pageNo, pageSize, sortKey) {
		var params = {pageno: pageNo, pagesize: pageSize};
		if (sortKey) {
			var name = sortKey.substring(0, sortKey.indexOf('-'));
			if (sortKey.substr(-2) == 'dn')
				name = '-' + name;
			params.sort = name;
		}
		return $http.get(baseUrl + '/page', {params: params})
			.then(function (resp) {
				return resp.data;
			});
	};

	exp.add = function (user) {
		return $http.post(baseUrl, user)
			.then(function (resp) {
				return resp.data;
			})
	}

	exp.update = function (user) {
		return $http.put(baseUrl + '/' + user._id, user)
			.then(function (resp) {
				return resp.data;
			})
	}

	exp.remove = function (user) {
		return $http.delete(baseUrl + '/' + user._id);
	};

	return exp;
})
