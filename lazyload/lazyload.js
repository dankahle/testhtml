
angular.module('dkLazyLoad', [])
   .factory('llServ', function() {
      return {
         getText: function() {
            return 'llServ text';
         }
      }
   })
   .directive('llDir', function(llServ) {
      return {
         templateUrl: 'llDir',
         link: function($scope, elem, attrs, ctrl) {
            $scope.name = llServ.getText();
         }
      }
   })
