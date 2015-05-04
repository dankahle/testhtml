

var sprite = require('css-sprite');
sprite.create({
	src: ['./images/quest.jpg', './images/bg1.png' ],
	out: './images',
	name: 'css-sprites',
	style: './less/css-sprites.less',
	cssPath: '../images',
	processor: 'less'
}, function () {
	console.log('done');
});

