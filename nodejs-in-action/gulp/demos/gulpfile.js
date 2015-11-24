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

gulp.task('watch', function(){
	gulp.watch('templates/*.tmpl.html', function(event){
		console.log('Event type: ' + event.type);
		console.log('Event path: ' + event.path);
	});
});

var watcher = gulp.watch('templates/*.tmpl.html', ['build']);
watcher.on('change', function(event){
	console.log('Event type: ' + event.type);
	console.log('Event path: ' + event.path);
});

var less = require('gulp-less'),
	livereload = require('gulp-livereload'),
	watch = require('gulp-watch');
gulp.task('less', function(){
	gulp.src('less/*.less')
		.pipe(watch('less/*.less'))
		.pipe(less())
		.pipe(gulp.dest('css'))
		.pipe(livereload())
});

var browserSync = require('browser-sync');
gulp.task('browser-sync', function(){
	var files = [
		'./**/*.html',
		'./css/**/*.css',
		'./imgs/**/*.png',
		'./js/**/*.js'
	];
	
	browserSync.init(files, {
		server: {
			baseDir: '.'
		}
	});
});

var autoprefix = require('gulp-autoprefixer');
gulp.task('build-css', function(){
	gulp.src('less/*.less')
		.pipe(less())
		.pipe(autoprefix({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('build/css'));
});