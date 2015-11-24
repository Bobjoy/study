var gulp = require('gulp');
var ant = require('./index');

gulp.task('ant', function(){
	ant({target: 'tests'});
	return gulp.src('./src')
						 .pipe(ant({target: 'test'}));
});