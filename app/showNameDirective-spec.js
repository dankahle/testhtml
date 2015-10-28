
describe("showName directive tests", function() {
   var $compile, $rootScope;

   beforeEach(module('app'));
   beforeEach(module({
      namer: 'carl'
   }));
   beforeEach(inject(function(_$compile_, _$rootScope_, _namer_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_
      namer = _namer_;
   }));

   it('shows name', function() {
      console.log(namer)
      var scope = $rootScope.$new();
      scope.vm = {
         name: 'dankman'
      }

      var elem = $compile('<show-name></show-name>')(scope);
      scope.$digest();// have to digest to run watchers so need a real scope
      expect(elem.html()).toMatch(/showName: dankman/);
      expect(elem.html()).toContain('dankman');
   })

});
