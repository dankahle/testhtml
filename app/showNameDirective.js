

angular.module('app')
   .run(function($templateCache) {
      $templateCache.put('app/showNameDirective.html', '<div>showName: {{vm.name}}</div>');
   })


angular.module('app')
   .directive('showName', function() {
      return {
         restrict: 'E',
         replace: true,
         scope: {
            defname: '@'
         },
         templateUrl: 'app/showNameDirective.html',
         //template: '<div>showName: {{vm.name}}</div>',
         controller: 'showNameCtrl',
         controllerAs: 'vm',
         bindToController: true
      }
   })


angular.module('app')
   .controller('showNameCtrl', function($scope) {
      var vm = this;

      vm.name = vm.defname || $scope.$parent.vm.name;
   })


