/// <reference path="../.tsd/backbone/backbone.d.ts" />

'use strict';

// 对Backbone对象增加一个自定义事件
Backbone.on('sayHi', function(){
	console.log('Hi');
});

// 创建一个eavesdropper对象，用Backbone.Events继承对象
var eavesdropper = _.extend({}, Backbone.Events);

// 令eavesdropper监听Backbone对象自定义sayHi事件
eavesdropper.listenTo(Backbone, 'sayHi', function(){
	console.log('I heard that');
});

// 触发／调用sayHi自定义事件
Backbone.trigger('sayHi');