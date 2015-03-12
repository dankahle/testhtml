

var gulp = require('gulp');

var tap = require('gulp-tap')


var karma = require('karma').server
	ngHtml2js = require('gulp-ng-html2js'),
	concat = require('gulp-concat')



var plumber = require('gulp-plumber'),
	mocha = require('gulp-mocha')

gulp.task('test', function (done) {
	karma.start({
		configFile: __dirname + '/test/karma.conf.js',
		singleRun: true
	}, done);
});

gulp.task('nghtml2js', function() {
	gulp.src('./app/directives/partials/*.html')
		.pipe(ngHtml2js({
			moduleName: "lplDirectives-partials",
			prefix: "partials/"
		}))
		.pipe(concat('lplDirectives-partials.js'))
		.pipe(gulp.dest("./app/directives/partials"));
})

var protractor = require("gulp-protractor").protractor;

gulp.task('e2etest', function() {
	gulp.src(["./test/e2e/**/*.js"])
		.pipe(protractor({
			configFile: "test/protractor.config.js",
			args: ['--baseUrl', 'http://127.0.0.1:8000']
		}))
		.on('error', function(e) { throw e })

})

gulp.task('glob', function() {
	gulp.src('src/{,*/}*.js')
		.pipe(tap(function(file) {
			console.log(file.path);
		}))
})

gulp.task('testMocha', function () {
	gulp.src('./mochatest/*.js', {cwd: __dirname})
		.pipe(plumber({}))
		.pipe(mocha({ reporter: 'list' }));
});


gulp.task('test-mocha', ['testMocha']);
