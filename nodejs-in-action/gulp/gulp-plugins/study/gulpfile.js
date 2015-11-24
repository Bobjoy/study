var gulp = require('gulp');
var prefix = require('./index');

gulp.src('./').pipe(prefix('bfl')).pipe(gulp.dest('./modified-files'));
