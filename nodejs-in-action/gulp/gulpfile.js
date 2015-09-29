var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat');

gulp.task('minify', function(){
	gulp.src('js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('../build/js'))
});

gulp.task('js', function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('../build'))
});

gulp.task('greet', function(){
	console.log('Hello World!');
});

gulp.task('css', ['greet'], function(){
	console.log('css');
});

gulp.task('build', ['css', 'js'], function(){
	console.log('build');
});

gulp.task('default', ['build'], function(){
	console.log('default');
});