/**
 * 脚本参数 – Script Arguments
 * Usage: phantomjs arguments.js foo bar baz
 */
var system = require('system');
if (system.args.length === 1) {
  console.log('Try to pass some args when invoking this script');
} else {
  system.args.forEach(function(arg, i){
    console.log(i + ': ' + arg);
  });
}
phantom.exit();
