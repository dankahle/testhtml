

angular.module('app')
   .filter('addAge', function() {
   return function(val) {
      return val + '50';
   }
});
