
var express = require('express');

var app = express();
app.use(express.static('.'));


app.listen(3001, function () {
	console.log('server started on 3001')
})


