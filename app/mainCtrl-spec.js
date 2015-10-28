
describe("mainCtrl tests", function() {
   var $controller, mainCtrl, $scope;

   beforeEach(module('app'));
   beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
      $scope = {};
      mainCtrl = $controller('mainCtrl as vm', {$scope: $scope});
   }));

   it('sets name to \'dank\'', function() {
      expect($scope.vm.name).toEqual('dank');
   })

   it('sets name to \'dank\'', function() {
      expect($scope.vm.getFullName('lala')).toEqual('dank lala');
   })

});
