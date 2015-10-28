'use strict';


describe('userService tests', function() {
   var serv;

   beforeEach(module('app'));
   beforeEach(inject(function(_userService_) {
      serv = _userService_;
   }));

   it('should return \'val lala\' when given val', function() {
      expect(serv.appendLalaToString('dank')).toEqual('dank lala');
   })

})

