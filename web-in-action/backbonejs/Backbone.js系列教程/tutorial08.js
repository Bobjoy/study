/// <reference path="../.tsd/backbone/backbone.d.ts" />

'use strict';

Backbone.history.start({
 
	/*Boolean,默认为false,true的意思是使用pushState如果可用，如果需要则退回哈希路径*/
	pushState: true,
	 
	/*Boolean,默认为真, 值为false的意思是假如pushState为真，则意味着浏览器不支持pushState，然后
	进行基于URL路径的传统浏览器重载。如果pushState为假，同时hashChange为假，
	那么url的改变，然后进行基于URL路径的传统浏览器重载。*/
	hashChange: false,
	 
	/*字符串默认为 ''，backbone假定你的服务是从根路径开始 (也就是 /)。
	一个非''的值是字符串路径，你的应用程序服务就从这个字符串路径开始，并且Backbone目录指向参照根目录。*/ 
	root:'',
	 
	/*Boolean,默认为假,值为真则意味着不运行默认路由(也就是'')。*/
	silent: true
 
});

window.location.hash = 'help'