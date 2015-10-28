

angular.module('app')
.controller('mainCtrl', function($scope) {
      var vm = this;

      vm.name = 'dank';

      vm.getFullName = function(val) {
         return vm.name + ' ' + val;
      }
   })
