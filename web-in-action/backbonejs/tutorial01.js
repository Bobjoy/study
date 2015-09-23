/**
 * From: http://www.gbtags.com/gb/share/1920.htm
 * Backbone中的Models（模型）、Views（视图）和Controller（控制器）
 * Backbone.js包含以下几个主要功能：
 * 创建模型（以及模型集合）；
 * 创建视图；
 * 管理绑定，管理事件兼用不同的模型以及视图与框架其他部分的联系；
 * 在模型中使用观察者模式，一旦模型触发任何change事件，所有显示此模型数据的视图接受到该change事件通知，从而自动进行事件重新渲染；
 * 给DOM处理所依赖的jQuery或Zepto提供支持。
 */

/// <reference path="../.tsd/backbone/backbone.d.ts" />

'use strict';

console.log('-------第一部分：模型（Models）------');

/**
 * 第一部分：模型（Models）
 */

// 创建模型，首先我们创建一个包含数据的Person对象。
var Person = Backbone.Model.extend({
	// Person实例的构造函数
	initialize: function() {
		console.log('Person is initialized.');
		
		/**
		 * Backbone的绑定功能很强大，当Model数据变化的时候，
		 * 能够自动的触发方法，更新视图View
		 * 
		 * 当name属性改变时，添加一个绑定函数
		 */
		this.bind('change:name', function(){
			console.log(this.get('name') + ' is now the value for name');
		});
		
		/**
		 * 我们当然希望Backbone模型中的数据是有效的，
		 * 因此我们添加error，validate方法来确保在创建对象前，数据是有效的
		 * 
		 * 添加一个和error错误绑定的方法，用于处理错误数据
		 */
		 this.bind('error', function(model, error){
			 console.error(error);
		 });
	},
	
	/**
	 * 如果我们不提供姓名和身高时，
	 * 这个Person对象的这两个属性会为空，
	 * 因此，我们现在为Person对象提供默认属性设置
	 */
	defauts: {
		name: 'undefined',
		age: 'undefined',
		height: '3"'
	},
	
	// validate方法来确保在创建对象前，数据是有效的
	validate: function(attributes){
		if (attributes.name === 'Joe') {
			return 'Uh oh, you\'re name is Joe!'
		}
	}
});

// 添加一些参数，提供更多的数据
var p1 = new Person({name: 'Matt', height: '6\'2'});
console.log(p1.get('name'));

console.log('-------');

// 默认属性设置
var p2 = new Person;
p2.set({name: 'Matt', height: '6\'2'});
console.log(p2.get('name'));

console.log('-------');

// Backbone的绑定功能
var p3 = new Person;
p3.set({name: 'Joe', height: '6 feet'});
console.log(p3.toJSON());


console.log('-------第二部分：视图（Views）------');

/**
 * 第二部分：视图（Views）
 */
 
var Links = Backbone.Model.extend({
	/* 无法访问到该处自定义属性
	data: [
		{text: 'Google', href: 'http://google.com'},
		{text: 'Facebook', href: 'http://facebook.com'},
		{text: 'Youtube', href: 'http://youtube.com'}
	],
	*/
	defaults: {
		data: [
			{text: 'Google', href: '#/google.com'},
			{text: 'Facebook', href: '#/facebook.com'},
			{text: 'Youtube', href: '#/youtube.com'}
		]
	}
});

var View = Backbone.View.extend({
	// 创建构造函数
	initialize: function() {
		console.log(this.model.get('data'));
		
		//$('body').append(this.el);
	},
	
	el: '#container',
	
	events: {
		'click button': 'render'
	},
	
	render: function() { // // 通常这个方法被Backbone调用
		var data = this.model.get('data');
		for (var i = 0, l = data.length; i < l; i++) {
			var li = this.template
						 .find('li')
						 .clone()
						 .find('a')
						 .attr('href', data[i].href)
						 .text(data[i].text)
						 .end();
			this.$el // <-- this.$el 是视图元素的jQuery对象, this.el 是DOM对象
				.find('ul#list')
				.append(li);
			
		}
	}
});

// el参数 允许你将该视图附加到页面上已存在的元素
//var view = new View({el: $('#list')});

// tagName参数 还可以建立一个新的元素
//var view = new View({tagName: 'div', className: 'class', id: '', attributes: ''});

// 在这个步骤中，我们要使用一个静态的不变的目标
var view = new View({
	model: new Links
});
view.template = $('#list-template')


console.log('-------第三部分：路由器（Router）------');

/**
 * 第三部分：路由器（Router）
 * 
 * 路由器提供导航和控制，让我们发出指令到Web应用程序。
 * 添加sub-URLs或标签就能进行导航，还可以通过链接快速定位应用程序准确的特征
 */

var Router = Backbone.Router.extend({
	routes: {
		// 这个会匹配任何url是符合foo/<param>的，并且提供:bar: 作为参数，传输到paramtest方法中
        // : 会匹配下一个URI
        // 所以#foo/1 会调用paramtest(1)
		'foo/:bar': 'paramtest',
		
		// * 会匹配全部剩下的URI, 所以 #a/b/c 会调用 func("a/b/c")
		'*com': 'func'
	},
	func: function(action) {
		console.log('action: ' + action);
	},
	paramtest: function(param) {
		console.log('param: ' + param);
	}
});

new Router();
Backbone.history.start();


console.log('-------第四部分：集合（Collections）------');

/**
 * 第四部分：集合（Collections）
 * 
 * 集合提供一种机制将多种实例模型组合起来，
 * 提供强大的功能特性来维护和收集数据到列表中
 */

var People = Backbone.Collection.extend({
	// 当集合被创建时调用
	initialize: function() {
		console.log('People Collection is initialized');
	},
	
	// 定义存入集合的数据模型
	model: Person
});
// 创建一个新的Person对象
var person = new Person({name: 'Joe'});
// 建立一个集合，然后将Person对象加入这个集合中
var people = new People(person);
people.add([{name: 'Bob'}, {name: 'Joy'}]);
// 在控制台中，打出这个数据模型的数据
console.log(people.toJSON());