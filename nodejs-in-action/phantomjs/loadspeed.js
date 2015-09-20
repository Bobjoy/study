/**
 * 页面加载 – Page Loading
 * 加载一个特殊的URL (不要忘了http协议) 并且计量加载该页面的时间
 * Usage: phantomjs loadspeed.js http://www.google.com
 */
var page = require('webpage').create(),
	system = require('system'),
	t, address;

if (system.args.lengty === 1) {
	console.log('Usage: loadspeed.js <some url>');
	phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address, function(status){
	if (status !== 'success') {
		console.log('FAIL to load the address');
	} else {
		t = Date.now() - t;
		console.log('Loading time ' + t + ' msec');
	}
	phantom.exit();
});