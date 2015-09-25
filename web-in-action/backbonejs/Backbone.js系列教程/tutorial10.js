/// <reference path="../../.tsd/backbone/backbone.d.ts" />
/// <reference path="../../.tsd/underscore/underscore.d.ts" />

'use strict';

/**
 * 子分类与创建一个Backbone.View
 */
var MyView = Backbone.View.extend({ //Note the uppercase M, it's a constructor
 
    myViewProperty : '...',
 
    myViewMethod: function () {
        return '...';
    }
});
 
var myViewInstance = new MyView(); //create instance
 
console.log(myViewInstance.myViewProperty); //logs '... '
console.log(myViewInstance.myViewMethod()); //logs '...'

console.info('>>>>利用选项配置一个Backbone.View');
/**
 * 利用选项配置一个Backbone.View
 */
//继承一个view
var MyView = Backbone.View.extend({

	model: {},
	events: {} || function(){return {}},
	collection: {},
	el: '' || function(){return ''},
	id: '',
	className: '' || function(){return ''},
	tagName: '' || function(){return ''},
	attributes: {attribute1:'value',attribute2:'value'}

});
//实例化一个view
var myView = new Backbone.View({
	
	model: {},
	events: {} || function(){return {}},
	collection: {},
	el: '' || function(){return ''},
	id: '',
	className: '' || function(){return ''},
	tagName: '' || function(){return ''},
	attributes: {'attribute1':'value','attribute2':'value'}

});

var myView = new Backbone.View({ //options...
    foo:'',
    model: {},
    events: {} || function(){return {}},
    collection: {}, 
    el: '' || function(){return ''},
    id: '',
    className: '' || function(){return ''},
    tagName: '' || function(){return ''},
    attributes: {'attribute1':'value','attribute2':'value'}
});
//实例上的特殊选项
console.log(Object.keys(myView));
//special & non-special options stored on options property (e.g. foo)
//console.log(Object.keys(myView.options)); // Uncaught TypeError: Cannot convert undefined or null to object

console.info('>>>>Backbone视图实例化之后运行initialize()函数');
/**
 * Backbone视图实例化之后运行initialize()函数
 */
var MyView = Backbone.View.extend({
    initialize:function(){
        console.log('initialize is invoked');
        console.log(this); //note this function is scope to the instance created
    }
});
 
//创建实例并调用初始化函数
var myViewInstance = new MyView();

console.info('>>>>渲染一个视图');
/**
 * 渲染一个视图
 */
var MyView = Backbone.View.extend({
    initialize:function(){
        this.render() //just like calling myViewInstance.render();
    },
    render:function(){
        console.log('rendering view');
        console.log(this); //note this function is scope to the instance created
        return this;
    }
});
//创建视图,运行初始化，让初始化函数调用渲染函数
var myViewInstance = new MyView();

console.info('>>>>把一个元素节点与一个视图连接到一起');
/**
 * 把一个元素节点与一个视图连接到一起
 */
var MyView = Backbone.View.extend({
    initialize:function(){
        this.render();
    },
    render:function(){
        console.log(this.el); //logs <div id="myView">
        return this;
    }
});
 
//在html文档中el是一个元素，拥有一个名为#myView的id
var myViewInstance = new MyView({el:'#myView'});

var MyView = Backbone.View.extend({
    initialize:function(){
        this.render() //just like calling myViewInstance.render();
    },
    render:function(){
        console.log(this.el); //logs <div>
        return this;
    }
});
 
//this创建了一个div在内存中，也就是$('<div>')
var myViewInstance = new MyView({tagName:'div'});

console.info('>>>>设置内存中一个元素节点的元素属性');
/**
 * 设置内存中一个元素节点的元素属性
 */
var MyView = Backbone.View.extend({
    tagName:'div',
    id: 'myView',
    className: 'views',
    attributes:{'data-foo':'foo','data-bar':'bar'},
    initialize:function(){
        //just like calling myViewInstance.render();
        this.render();
    },
    render:function(){
        //logs <div id="myView" class="views" data-foo="foo" data-bar="bar">
        console.log(this.el); 
    }
});
 
var myViewInstance = new MyView(); //look in render()

console.info('>>>>使用jQuery包装el的简称（即this.$el）');
/**
 * 使用jQuery包装el的简称（即this.$el）
 */
var MyView = Backbone.View.extend({
    initialize:function(){
        this.render()
    },
    render:function(){
        //this.$el是jQuery(this.el);的简称
        console.log(this.$el.attr('id')); //logs myView, 
        //如果上面不使用简称的话，则表达为$(this.el).attr('id')
    }
});
 
var myViewInstance = new MyView({el:'#myView'});

console.info('>>>>使用jQuery局域包装el的简称（即this.$()）');
/**
 * 使用jQuery局域包装el的简称（即this.$()）
 */
var MyView = Backbone.View.extend({
    initialize:function(){
        this.render()
    },
    render:function(){
        //this.$()是jQuery(this.el).find('span');的简称
        //通过$('span')能够找到所有的span元素
        //使用this.$('span')只能找到/筛选出el节点中的span
        this.$('button').css('color','red');
    }
});
 
var myViewInstance = new MyView({el:'#myView'});

console.info('>>>>利用events属性为一个Backbone视图设置委托事件');
/**
 * 利用events属性为一个Backbone视图设置委托事件
 */
var MyView = Backbone.View.extend({
    events: {
        'click button': 'sayHi', //click is event, button is selector
        'mouseover button': 'aboutToSayHi'
    },
    sayHi: function () {
        console.log('hi');
    }, 
    aboutToSayHi: function () {
        console.log('over the button, almost about to click');
    }
});

var myViewInstance = new MyView({el: '#myView'});

console.info('>>>>利用setElement()把元素节点与一个视图关联起来');
/**
 * 利用setElement()把元素节点与一个视图关联起来
 */
var MyView = Backbone.View.extend({
    events: {'click button': 'sayHi'},
    sayHi: function () {console.log('hi');}, 
    render: function () {
        this.$el.html('<button>sayHi</button>');
        return this;
    },
    initialize:function(){this.render();}
});
 
var myViewInstance = new MyView({el: '#myView'});
//change el for myViewInstance, and re-render, note event works
myViewInstance.setElement('#anotherMyView').render();

console.info('>>>>利用remove()从DOM上删除一个视图');
/**
 * 利用remove()从DOM上删除一个视图
 */
var MyView = Backbone.View.extend({
    events: {'click button': 'callRemove'},
    callRemove: function () {
        this.remove(); //从DOM上删除视图,清除DOM上所有事件
        console.log($('#myView').length); //verify its gone, logs 0
    },
    render: function () {
        this.$el.html('<button>invoke remove()</button>');
        return this;
    },
    initialize:function(){this.render();}
});
 
var myViewInstance = new MyView({el: '#myView'});

console.info('>>>>利用delegateEvents()附加委托事件');
/**
 * 利用delegateEvents()附加委托事件
 */
var MyView = Backbone.View.extend({
    sayHi: function () {console.log('hihi');}, 
    render: function () {
        this.$el.html('<button>sayHiHi</button>');
        $('body').append(this.el);
    },
    initialize:function(){this.render();}
});
 
var myViewInstance = new MyView(); //create view
myViewInstance.events = {'click button':'sayHi'}; //set events object
 
//需要调用delegateEvents，因为我们在视图创建之后设置事件
myViewInstance.delegateEvents();
//现在事件应当工作，能调用undelegatedEvents进行删除

console.info('>>>>使用视图模板');
/**
 * 使用视图模板
 */
var template = '<%= firstName %> <%= lastName %> / <%= telephone %>';
var data = {firstName: 'John', lastName: 'Doe', telephone: '111-111-1111'};
var MyView = Backbone.View.extend({
    el:'#myView',
    initialize:function(){this.render()},
    render:function(){
        var compiledTemplate = _.template(template); //编译模板
        //在Backbone "el"中加载编译的HTML
        this.$el.html(compiledTemplate(data));
    }
});
var myViewInstance = new MyView();