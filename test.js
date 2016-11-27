var Rx = require('rx');


var source = Rx.Observable.interval(1000);

var subscription1 = source.subscribe(
   function (x) { console.log('Observer 1: onNext: ' + x); },
   function (e) { console.log('Observer 1: onError: ' + e.message); },
   function () { console.log('Observer 1: onCompleted'); });


setTimeout(function () {
   var subscription2 = source.subscribe(
      function (x) { console.log('Observer 2: onNext: ' + x); },
      function (e) { console.log('Observer 2: onError: ' + e.message); },
      function () { console.log('Observer 2: onCompleted'); });
}, 3000);

/*
var obs = {
   onNext: function(x) {console.log(x); },
   onError: function(x) {console.log(x); },
   onCompleted: function(x) {console.log('completed'); }
}

   var observable = rx.Observable
      .from([4,5,6])
      .subscribe(obs);
*/

/*
var observable = rx.Observable.create(function(o) {
   [1,2,3,4,5].forEach(function(v) {
      if(v === 3)
         throw new Error('shit its three');
      o.onNext(v*2);
   })
   o.onCompleted();
})

observable.subscribe(obs);
*/


