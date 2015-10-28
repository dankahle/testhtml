'use strict';


angular.module('app')
   .factory('userService', function() {

      return {
         appendLalaToString: function(val) {
            return val + ' lala';
         }
      }

   })
