
var app = angular.module('app', ['restangular', 'ui.router', 'ngAnimate', 'trNgGrid']);

app.config(function (RestangularProvider, $stateProvider, $urlRouterProvider) {
	RestangularProvider.setBaseUrl('http://localhost:3000/api');
});

app.run(function ($rootScope, $templateCache) {
	$rootScope.moment = moment;
	//TrNgGrid.columnSortNormalOrderCssClass = 'tr-ng-sort-order-normal fa fa-star'

	TrNgGrid.defaultPagerMinifiedPageCountThreshold = 5;


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

app.directive('ngVisible', function() {
	return {
		link: function($scope, elem, attr) {
			$scope.$watch(function() { return $scope.$eval(attr.ngVisible);}, function(val) {
				if(val)
					elem.css('visibility', 'visible');
				else
					elem.css('visibility', 'hidden');
			})
		}
	}
})

app.filter('nameAge', function() {
	return function(val, item) {
		return item.name + item.age;
	}
})

app.directive('trackTable', function($location) {
	return {
		link: function($scope, elem, attr) {
			function getSortKey() {
				if($scope.orderBy)
					return $scope.orderBy + ($scope.orderByReverse? '-dn': '-up');
				else
					return null;
			}
			$scope.$watch('curPage', function(val) {
				$location.search('curPage', val);
			})
			$scope.$watch('totalItems', function(val) {
				$location.search('totalItems', val);
			})
			$scope.$watch('orderBy', function(val) {
				$location.search('sortKey', getSortKey());
			})
			$scope.$watch('orderByReverse', function(val) {
				$location.search('sortKey', getSortKey());
			})

			var search = $location.search();
			if(search.totalItems)
				$scope.totalItems = search.totalItems;
			if(search.curPage)
				$scope.curPage = parseInt(search.curPage);
			if(search.sortKey) {
				$scope.orderBy = search.sortKey.substr(0, search.sortKey.length - 3);
				$scope.orderByReverse = search.sortKey.substr(-2) == 'up'? false: true;
			}
			console.log('set', $scope)

		}
	}
})

/*
 todo:
 * delete needs to stay on same page, but might not be there after delete. What to do?
 */

app.controller('ctrl', function ($scope, userRepo) {
	$scope.dkGridRepo = userRepo;
	$scope.filters  = {name: 't', age: 31};

/*
	userRepo.getAll().then(function(users) {
		$scope.users = users;
	});
*/



	$scope.getPage = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
		$scope.users = [];
		var sortKey;
		if(orderBy && orderByReverse)
			sortKey = orderBy + '-dn';
		else if(orderBy)
			sortKey = orderBy + '-up';
		console.log('getpage', currentPage, pageItems, sortKey)
		userRepo.getPage(currentPage+1, pageItems, sortKey)
			.then(function(data) {
				$scope.totalItems = data.numRecords;
				$scope.users = data.data;
			})
	}

	$scope.edit = function(val) {
		console.log('edit', val)
	}
	$scope.del = function(val) {
		console.log('del', val)
	}
	$scope.changeName = function(item) {
		item.name += 'lala';
	}

})
