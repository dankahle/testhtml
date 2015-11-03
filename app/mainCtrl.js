

angular.module('app')
.controller('mainCtrl', function($scope, prompt, notify) {
      var vm = this;

      vm.name = 'dank';

      vm.getFullName = function(val) {
         return vm.name + ' ' + val;
      }

      vm.click = function() {

         notify({
            message: 'my message',
            duration: 5000
         })

      }


   })
