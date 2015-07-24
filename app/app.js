

var app = angular.module('app', ['lplDirectives']);


app.controller('ctrl', function($scope, $http){

	$scope.bday = '06/29/1957';

	$scope.click = function() {
		var $bday = $('[ng-model="bday"]');
		$bday.datepicker('setDate', '01/01/2013');
		$bday.change();
	}

})
