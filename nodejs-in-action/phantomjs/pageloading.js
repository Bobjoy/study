/**
 * 页面加载 – Page Loading
 * 加载{URL},并且将它保存为一张图片
 */
var page = require('webpage').create();
page.open('http://www.tuicool.com', function(status){
	console.log('Status: ' + status);
	if (status === 'success') {
		page.render('pageloading.png');
	}
	phantom.exit();
});