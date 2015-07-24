
var module;
try {
	module = angular.module('lplCommon');
} catch(e) {
	module = angular.module('lplCommon', []);
}

module.value('lplUrls', {apiUrl: 'http://localhost:3000/api/'});
