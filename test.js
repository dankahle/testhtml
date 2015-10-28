

var arr = [1,2,5,4,5,6,7];


function test() {
   for(var i = 0; i < arr.length; i++) {
      console.log(i)
      if(i == 5)
         return;
   }
}


function findVal(val) {
   for(var i = 0; i < arr.length; i++) {
      console.log(arr[i])
      if (arr[i] == val) {
         return true;
      }
   }
}


function test3() {
   if(findVal(5)) {
      console.log('found')
      return;
   }

   console.log('dontgethere')
}

test3();
