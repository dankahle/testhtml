
describe("filter tests", function() {
   var $filter;

   beforeEach(module('app'));
   beforeEach(inject(function(_$filter_) {
      $filter = _$filter_;
   }));

   describe('addAgeFilter tests', function() {
      var filter;
      beforeEach(function() {
         filter = $filter('addAge');
      })

      it('adds 50 to name', function() {
         expect(filter('dank')).toEqual('dank50');
      })

      it('adds 50 to anything', function() {
         expect(filter('anything')).toEqual('anything50');
      })

   })

});
