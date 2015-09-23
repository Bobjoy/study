/// <reference path="../.tsd/backbone/backbone.d.ts" />

'use strict';

/**
 * Backbone构造函数
 */

console.log('-----模型------')
// 模型
var myModel = new Backbone.Model();
 
console.log('myModel = new Backbone.Model();');
 
console.log('myModel Instance Properties:');
console.log(_.keys(myModel));
 
console.log('myModel Prototype Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myModel)));

console.log('-----集合------')
// 集合
var myCollection = new Backbone.Collection();
 
console.log('var myCollection = new Backbone.Collection();');
 
console.log('myCollection Instance Properties:');
console.log(_.keys(myCollection));
 
console.log('myCollection prototype Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myCollection)));

console.log('-----路由器------')
// 路由器
var myRouter = new Backbone.Router({routes:{'foo':'bar'},bar:function(){}});
 
console.log('var myRouter = new Backbone.Router();');
 
console.log('myRouter Instance Properties:');
console.log(_.keys(myRouter));
 
console.log('myRouter prototype Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myRouter)));

console.log('-----视图------')
// 视图
var myView = new Backbone.View();
 
console.log('var myView = new Backbone.View();');
 
console.log('myView Instance Properties:');
console.log(_.keys(myView));
 
console.log('myView Inherited Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myView)));

// 每种构造函数的可选参数项
//var myModel = new Backbone.Model(attributes, {options});
/*
attributes = {data:value, data:value} || [value,value]
 
options = {
 collection: {}, 
 url: '', 
 urlRoot: '', 
 parse: boolean
}
*/

//var myCollection = new Backbone.Collection(model(s), {options});
/*
models = model || [model,model,model] || {model:data} || [{model:data},{model:data}];
 
options = {
 url: '', 
 model: {}, 
 comparator: function(){} || ''
}
*/

//var myView = new Backbone.View({options});
/*
options = {
 model: {}, 
 events: {} or function(){return {}}
 collection: {}, 
 el: '' or function(){return ''}, 
 id: '', 
 className: '' or function(){return ''}, 
 tagName: '' or function(){return ''}, 
 attributes: {attribute:value,attribute:value}
}
*/

//var myRouter = new Backbone.Router({options});
/*
options = {
 routes:{}
}
*/

/*还要注意历史选项*/
//Backbone.History.start({options});
/*
options = {
 pushState: boolean,
 root: '',
 hashChange: boolean,
 silent: boolean
}
*/

console.log('-----利用内部Backbone extend()辅助函数创建子类------')

/**
 * 利用内部Backbone extend()辅助函数创建子类Model()、
 * Collection()、Router()和View()构造函数
 */

/* 创建一个视图构造函数,有点类似Backbone.js中的Backbone.View */
var View = function (parameter1,parameter2) {
    this.IAm = 'View Constructor';
    /*调用原型链中的第一个初始化函数，并设定它的作用域到this*/
    this.initialize.apply(this, arguments); //传递参数数组到初始化函数
};
 
/*当无初始化函数被传递给extend()函数， 调用一个空的初始化函数来继承这个视图构造函数的原型*/
View.prototype.initialize = function () {};
 
/*创建一个通用静态extend()函数，用于创建子类（子类构造函数），把它视作一个属性视图构造函数*/
View.extend = function (protoProps, staticProps) {
 
    var parent = this;/*代码中的this是一个视图构造函数,也就是说函数继承是一个静态属性*/
    var child; /*this将成为子类构造函数,在代码中特别显示为subView*/
 
    if (protoProps && _.has(protoProps, 'constructor')) {  /*检查是否有被传递给extend()一个可替换的构造函数*/
        child = protoProps.constructor; /*如果有,则将它作为子构造函数*/
    } else {
         /*如果没有，则创造一个函数(也就是子构造函数)，可以调用View()构造函数把子构造函数的参数传递给它，
并设定文本到子构造函数。这个步骤复制了View构造函数的属性*/

        child = function () {
            return parent.apply(this, arguments);
        };
    }
    /*添加静态父类属性以及任何用于extend()的静态属性,当然父类中包含了extend()它本身,
因此subView()现在能调用extend()和子构造并且可以用于持续下去*/
    _.extend(child, parent, staticProps);
 
    /*让原型链继承父类(代码中的View), 但不调用父类构造函数
    基本上，this连接父类构造函数（代码中的View）与子构造函数之间的原型链*/
    var Surrogate = function () {
        this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
 
    /*用if给子构造函数添加原型属性，所有子构造函数的实例都将继承这些属性 */
    if (protoProps){ _.extend(child.prototype, protoProps);}
 
    /*令子构造函数的静态属性，指向父类原型（View.prototype*/
    child.__super__ = parent.prototype;
 
    return child;/*返回子构造函数，全部准备好被调用来继承父类*/
};
/*继承View,基于View构造函数创建一个子构造函数(也就是继承View构造函数，令subView继承View)*/
var subView = View.extend({
    protoPropsHere: 'protoProps',
    IAm: 'subView Constructor',
    initialize: function (parameter1,parameter2) {//当subView创建了一个实例，运行初始化
        console.log('sub-constructor has been used, instance created');
        console.log('The ' + parameter1 +' '+ parameter2 + ' have been passed');
        console.log('the value of this:' + this.IAm + ', was correctly set');
    } 
}, {
    staticePropertiesHere: 'staticProperties'
}
 
);
 
/*验证subView的静态属性*/
console.log(subView.staticePropertiesHere);
 
/*创建subView实例，命名为myView，运行初始化函数传递可选项*/
var myView = new subView('param1','param2');
 
/*验证myView的原型属性*/
console.log(myView.protoPropsHere);

console.log('-----当被扩展的构造函数被实例化，运行初始化代码------')

/**
 * 当被扩展的构造函数被实例化，运行初始化代码
 */

var myModel = Backbone.Model.extend({
    /*the context of the initizlie function is set 
    to the instance object being created.*/
    
    //log the properties in this/instance
    initialize:function(){
        console.log(_.keys(this));
        console.log(_.keys(this.constructor.prototype)); //where you'll find name
    },
    name:'myModel'
});
 
 //创建一个实例，验证初始化被调用
new myModel;

var myModel = Backbone.Model.extend({
    initialize:function(a,b,number){console.log(a,b,number)}, //log paramaters
});
new myModel({a:'a'},{b:'b'},1); //传递属性，可选项和随机参数

console.log('-----重载被继承的构造函数------')

/**
 * 重载被继承的构造函数
 */

var SubModel = Backbone.Model.extend({
    constructor:function(){ //extend this constructor, not Model
        this.foo = 'bar';
		//Backbone.Model.apply(this, arguments);
    }
});
 
myModel = new SubModel();
 
console.log(myModel.foo); //日志 bar
 
/*cid由Model构造函数设置的一个实例属性，但是日志未定义 
因为我们创建了我们自己的构造函数*/
console.log(myModel.cid);
 
/*cid属性是由Model()设置的一个实例属性，我们没有使用Model 
我们使用的是一个自定义的构造函数，所以myModel没有cid属性*/

var SubModel = Backbone.Model.extend({
    constructor:function(){ //继承这个构造函数,而不是Model
        this.goo = 'boo';
        Backbone.Model.apply(this, arguments); //添加Model实例属性
    }
});
 
myModel = new SubModel();
 
console.log(myModel.goo); //日志 boo
console.log(myModel.cid); //日志 c1, cid是一个Model实例属性