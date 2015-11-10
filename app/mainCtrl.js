

angular.module('app')
.controller('mainCtrl', function($scope, $timeout) {

   var vm = this;
   vm.show = true;

   vm.itemArray = [
      {id: 1, name: 'first'},
      {id: 2, name: 'second'},
      {id: 3, name: 'third'},
      {id: 4, name: 'fourth'},
      {id: 5, name: 'fifth'},
   ];

   //vm.selectedItem = vm.itemArray[0];
   //vm.selectedItems = [vm.itemArray[0], vm.itemArray[4]];

   $timeout(function() {
      vm.show = false;
      $('.one').css('left', '0');
   }, 100)


   })
