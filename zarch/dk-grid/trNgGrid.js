
var app = angular.module('app', ['restangular', 'ui.router', 'ngAnimate', 'trNgGrid', 'xeditable']);

app.config(function (RestangularProvider, $stateProvider, $urlRouterProvider) {
	RestangularProvider.setBaseUrl('http://localhost:3000/api');
});

app.run(function ($rootScope, $templateCache) {
	$rootScope.moment = moment;
	//TrNgGrid.columnSortNormalOrderCssClass = 'tr-ng-sort-order-normal fa fa-star'

	TrNgGrid.defaultPagerMinifiedPageCountThreshold = 5;


});
app.run(function(editableOptions, editableThemes) {
	editableOptions.theme = 'bs3';
	editableThemes.bs3.inputClass = 'input-sm';
	editableThemes.bs3.buttonsClass = 'btn-sm';
})

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

		}
	}
})

/*
 todo:
 * delete needs to stay on same page, but might not be there after delete. What to do?
 */

app.controller('ctrl', function ($scope, userRepo, $timeout) {
	var lastGetPage,
		mode = 'page';

	$scope.dkGridRepo = userRepo;
	$scope.filters  = {name: 't', age: 31};


	$scope.removeUser = function(item) {
		return userRepo.remove(item).then(function() {
			if(mode == 'all')
				$scope.users.splice($scope.users.indexOf(item), 1);
			else
				refresh();
		})

	}

	$scope.addUser = function() {
		$scope.inserted = {
			name: '',
			age: ''
		}
		$scope.users.push($scope.inserted);
	}

	$scope.saveUser = function(formData, item) {
		console.log('saveUser', formData)
		if(item._id)
			return userRepo.update(_.extend(item, formData));
		else
			return userRepo.add(_.extend(item, formData))
				.then(function(newVal) {
					$('table tbody tr:last-Child').remove();
					$timeout(function() {
						refresh();
					})
					return newVal;
				});
	}

	$scope.checkName = function(name, item) {
		//console.log('checkName', name, item)
	}

	$scope.checkAge = function(age, item) {
		//console.log('checkage', age, item)
	}

	function refresh() {
		if(mode == 'all') {
			console.log('refresh all')
			userRepo.getAll().then(function(users) {
				$scope.users = users;
			});
		}
		else {
			console.log('refresh page')
			$scope.getPage.apply($scope, lastGetPage);
		}

	}

	$scope.getPage = function(currentPage, pageItems, filterBy, filterByFields, orderBy, orderByReverse) {
		lastGetPage = Array.prototype.slice.call(arguments);
		console.log(lastGetPage)
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

	if(mode == 'all')
		refresh();
})
