'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;
var PluginError = gutil.PluginError;

var pluginName = 'gulp-ant';

module.exports = function(options) {
	
	console.log(options);

	return through.obj(function(file, encoding, callback) {
		var opts = options || {};
		
		if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new PluginError(pluginName, 'Streaming not supported'));
    }
		
		if (!opts.target) {
			return callback(new PluginError(pluginName, 'target not defined'));
		}
		
		var exec = require('child_process').exec;
		var cmd = 'ls ' + opts.target;
		
		exec(cmd, function(error, stdout, stderr){
			if (error != null) {
				console.log('exec error: ' + error);
			}
			
			if (stdout != null) {
				console.log('standard output:\n' + stdout);
			}
			
			if (stderr != null) {
				console.log('standard error output:\n' + stderr);
			}
		});
		
	});
};