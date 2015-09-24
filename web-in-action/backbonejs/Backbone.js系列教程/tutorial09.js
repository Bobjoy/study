/// <reference path="../.tsd/backbone/backbone.d.ts" />

'use strict';

/**
 * 利用Backbone.noConflict()存储和创建一个特殊的（就是自定义命名空间）引用到Backbone
 */

/*在加载最新Backbone.js版本之前，存储初始引用到Backbone*/
var lastBackboneParsed = Backbone.noConflict();

this.Backbone = {
	"I'm the previous owner of Backbone in the global scope": true
};

//验证全局作用域中的Backbone指向初始版本
console.log(Backbone["I'm the previous owner of Backbone in the global scope"]); //logs true

/*验证Backbone.js包含在新的lastBackboneParsed命名空间里，而不是在Backbone命名空间里*/
console.log(lastBackboneParsed.VERSION) //logs 1.0.0


/**
 * 利用Backbone.$分配DOM与XHR库
 */

// DOM & XHR utility
//或者在Backbone加载之后手动设置
Backbone.$ = {version:'0.0.1',name:'MyReCreateTheWheelDOM&AJAXLib'}