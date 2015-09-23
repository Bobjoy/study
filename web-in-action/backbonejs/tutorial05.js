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

/**
 * 利用Backbone.Events继承任意对象
 */
// 利用Backbone.Events方法继承A对象
var A = _.extend({name: 'A'}, Backbone.Events);
 
// 验证A是否被Backbone.Events方法继承
console.log(Object.keys(A));

console.log('-----利用on()绑定事件对象------')

/**
 * 利用on()绑定事件对象
 */

// 利用Backbone.Events方法继承A对象
var A = _.extend({name: 'A'}, Backbone.Events);

// 当事件被触发时添加一个事件A让回调函数被调用
A.on('whatsMyName', function(){
	console.log(this.name);
});

// 在对象A出发whatsMyName事件
A.trigger('whatsMyName');

console.log('-----利用on()绑定多个事件------')

/**
 * 利用on()绑定多个事件
 */

// 利用Backbone.Events方法继承A对象
var A = _.extend({name: 'A'}, Backbone.Events);

A.on('sayHi greet', function(){
	console.log('Hello');
});

// 触发sayHi和greet
A.trigger('sayHi');
A.trigger('greet');

console.log('-----on()的命名空间事件------')

/**
 * on()的命名空间事件
 */

var A = _.extend({name:'A'}, Backbone.Events);

A.on('say:hi', function () {
    console.log('on()的命名空间事件: Hi'); 
  $("#sayHi").text('Hi');
});

A.on('say:hello', function () {
    console.log('on()的命名空间事件: Hello'); 
    $("#sayHello").text('Hello');
});

//触发say:hi和say:hello,注意我用同一个触发调用了两个事件
A.trigger('say:hi say:hello');

//下面这样写不能同时触发两个事件
A.trigger('say');

console.log('-----使用trigger()触发和传递值到一个回调函数------')

/**
 * 使用trigger()触发和传递值到一个回调函数
 */

//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
A.on('say', function (options) {
    console.log(options[0]);
    console.log(options[1]); 
});
 
//在A触发say事件,同一行中给回调函数传递了两个字符串
A.trigger('say', ['Hello','Good Bye']);

console.log('-----利用on()来设置this，组织一个回调函数------')

/**
 * 利用on()来设置this，组织一个回调函数
 */

//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
var B = {name:'B'};
 
//当事件A调用,设置回调文本(this)为B
A.on('sayMyName', function () {
    console.log(this.name);
}, B);
 
//触发sayMyName
A.trigger('sayMyName'); //日志B，因为回调文本被修改了

console.log('-----利用off()删除事件和回调函数------')

/**
 * 利用off()删除事件和回调函数
 */
// 1：删除已命名的回调函数
// 利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
var foo = function () {
    console.log('foo');
};
var bar = function () {
    console.log('bar');
};
 
A.on('log',foo);
A.on('log',bar);
 
A.trigger('log'); //日志 后台输出foo以及bar
A.off('log',foo); //删除foo回调
A.trigger('log'); //日志 后台只输出bar，因为foo被删除了

// 2：删除对象的整个事件
//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
var foo = function () {
    console.log('foo');
};
var bar = function () {
    console.log('bar');
};
 
A.on('log',foo);
A.on('log',bar);
 
A.trigger('log'); //日志 后台输出foo以及bar
A.off('log'); //删除log事件
A.trigger('log'); //日志无，因为所有日志事件被删除了

// 3：删除所有事件中同一个已命名的回调函数
//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
var foo = function () {
    console.log('foo');
};
 
A.on('log1',foo);
A.on('log2',foo);
 
A.trigger('log1 log2'); //日志 后台输出foo以及foo
A.off(null,foo); //删除所有事件的foo回调
A.trigger('log1 log2'); //日志无,因为所有foo回调被删除了

// 4：删除包含特定文本的所有事件
//利用Backbone.Events方法继承B对象
var B = _.extend({}, Backbone.Events);
var C = {}
 
B.on('logFoo',function () {
    console.log('foo');
},C);
 
B.on('logBar',function () {
    console.log('bar');
},C);
 
B.trigger('logFoo logBar'); //日志 后台输出foo以及bar
B.off(null,null,C); //删除包含C文本的所有事件
B.trigger('logFoo logBar'); //日志无,因为所有包含C文本的事件被删除了

// 5：删除一个对象的所有事件和回调
//利用Backbone.Events方法继承B对象
var B = _.extend({}, Backbone.Events);
 
B.on('logFoo',function () {
    console.log('foo');
});
 
B.on('logBar',function () {
    console.log('bar');
});
 
B.trigger('logFoo logBar'); //日志 后台输出foo以及bar
B.off(); //删除B对象的所有事件
B.trigger('logFoo logBar'); //日志无,因为所有对象B的事件被删除了

console.log('-----利用listenTo()让对象B监听对象A的事件------')

/**
 * 利用listenTo()让对象B监听对象A的事件
 */
 
//利用Backbone.Events方法继承对象A和对象B
var A = _.extend({name:'A'}, Backbone.Events);
var B = _.extend({name:'B'}, Backbone.Events);
 
var whosListeningToMe = function(){
    console.log(this.name);
};
 
//让对象B监听对象A上被触发的whosListeningToMe事件,然后调用whosListeningToMe
B.listenTo(A, 'whosListeningToMe', whosListeningToMe);
A.listenTo(A, 'whosListeningToMe', whosListeningToMe);
 
A.trigger('whosListeningToMe'); //日志 B
/* 
对象A没有whosListeningToMe事件,但这个事件能够通告监听者它已经被触发
*/

console.log('-----利用stopListening()停止一个对象对另一个对象上所有事件的监听------')

/**
 * 利用stopListening()停止一个对象对另一个对象上所有事件的监听
 */

// 1：停止所有监听
var A = _.extend({name:'A'}, Backbone.Events);
var B = _.extend({name:'B'}, Backbone.Events);
var C = _.extend({name:'C'}, Backbone.Events);

var whosListeningToMe = function(){console.log(this.name);};

//对象B监听对象A和对象C的whosListeningToMe事件
B.listenTo(A, 'whosListeningToMe', whosListeningToMe);
B.listenTo(C, 'whosListeningToMe', whosListeningToMe);

//触发对象A和对象C上的whosListeningToMe事件
A.trigger('whosListeningToMe'); //logs B
C.trigger('whosListeningToMe'); //logs B
 
//让对象B停止监听所有对象
B.stopListening();
 
//日志无，因为我们让对象B停止监听所有内容
A.trigger('whosListeningToMe');
C.trigger('whosListeningToMe');

// 2：停止对某一特定对象的监听
var A = _.extend({name:'A'}, Backbone.Events);
var B = _.extend({name:'B'}, Backbone.Events);
var C = _.extend({name:'C'}, Backbone.Events);
 
var whosListeningToMe = function(){console.log(this.name);};
 
B.listenTo(A, 'whosListeningToMe', whosListeningToMe);
B.listenTo(C, 'whosListeningToMe', whosListeningToMe);
 
A.trigger('whosListeningToMe'); //日志 B
C.trigger('whosListeningToMe'); //日志 B
 
B.stopListening(A);
 
//因为对象B停止监听对象A，所以后台输出无，但是对象B继续监听对象C
A.trigger('whosListeningToMe');
C.trigger('whosListeningToMe'); //日志 B

// 3：停止监听某一特定对象上的特定事件
var A = _.extend({name:'A'}, Backbone.Events);
var B = _.extend({name:'B'}, Backbone.Events);
 
var whosListeningToMe = function(){console.log(this.name);};
 
B.listenTo(A, 'whosListeningToMe', whosListeningToMe);
 
A.trigger('whosListeningToMe'); //日志 B
 
//让对象B停止监听对象A上的某一特定事件
B.stopListening(A,'whosListeningToMe');
//日志无，因为对象B停止监听对象A上的whosListeningToMe事件
A.trigger('whosListeningToMe');

// 4：停止监听特定对象上的某一特定事件和回调
var A = _.extend({name:'A'}, Backbone.Events);
var B = _.extend({name:'B'}, Backbone.Events);
 
var whosListeningToMe = function(){console.log(this.name);};
var whosListeningToMeAgain = function(){console.log(this.name);};
 
B.listenTo(A, 'whosListeningToMe', whosListeningToMe);
B.listenTo(A, 'whosListeningToMe', whosListeningToMeAgain);
 
A.trigger('whosListeningToMe'); //日志 后台输出B 以及B
 
//让对象B停止监听对象A上的特定事件和回调
B.stopListening(A,'whosListeningToMe',whosListeningToMeAgain); 
 
A.trigger('whosListeningToMe'); //日志 B

console.log('-----Backbone嵌入事件------')

/**
 * Backbone嵌入事件
 */

//创建一个默认的模型对象
var myModel = new Backbone.Model();
 
//绑定一个回调对象到嵌入'all'事件
myModel.on('all', function (e) {
    console.log('all:'+e);
});
 
//触发‘change'和‘change:attribute'事件,就会触发all两次
myModel.set({'test':'test'}); 
 
//*利用listenTo()可以达到相同的效果
var A = _.extend({}, Backbone.Events);
 
A.listenTo(myModel, 'all', function (e) {
    console.log('利用listenTo()可以达到相同的效果: ' + e);
});

myModel.trigger('all');
//*/