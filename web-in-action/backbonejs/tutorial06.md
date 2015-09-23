# Backbone.js系列教程六：构造Backbone对象

> 原文地址：http://www.gbtags.com/gb/share/1960.htm

## Backbone构造函数

我之所以说Backbone很简单，是因为Backbone只有四个构造函数能被典型的实例化（基本上，它们首先被继承或子分类）。这四种构造函数包括：

* Backbone.Model = function(attributes, {options}){};
* Backbone.Collection = function([models], {options}){};
* Backbone.Router = function({options}){}; //只能被具现化一次 
* Backbone.View = function({options}){};

现在我们来看看这些构造函数创建的每个实例中默认实例和原型属性是怎样的，简单用new关键词实现具现化，且不传递参数。打开浏览器控制台，你可以更清晰的查看实例和原型属性。

### 模型

```javascript
var myModel = new Backbone.Model();
 
console.log('myModel = new Backbone.Model();');
 
console.log('myModel Instance Properties:');
console.log(_.keys(myModel));
 
console.log('myModel Prototype Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myModel)));
```

### 集合

```javascript
var myCollection = new Backbone.Collection();
 
console.log('var myCollection = new Backbone.Collection();');
 
console.log('myCollection Instance Properties:');
console.log(_.keys(myCollection));
 
console.log('myCollection prototype Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myCollection)));
```

### 路由器

```javascript
var myRouter = new Backbone.Router({routes:{'foo':'bar'},bar:function(){}});
 
console.log('var myRouter = new Backbone.Router();');
 
console.log('myRouter Instance Properties:');
console.log(_.keys(myRouter));
 
console.log('myRouter prototype Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myRouter)));
```

###  视图

```javascript
var myView = new Backbone.View();
 
console.log('var myView = new Backbone.View();');
 
console.log('myView Instance Properties:');
console.log(_.keys(myView));
 
console.log('myView Inherited Properties & Methods:');
console.log(_.keys(Object.getPrototypeOf(myView)));
```

每种构造函数的属性均由Backbone现成提供。但是，通常你在构造这些函数之前，需要让它们继承（Backbone.Model.extend()）你自己的域特定的实例、原型属性和方法。

在继续下面的小节之前，我们简单的来看一下每种构造函数的可选参数项。本章中有一节专门详细叙述了这些参数，不过现在可以大致的了解一下可选参数项的概念。

```javascript
var myModel = new Backbone.Model(attributes, {options});
/*
attributes = {data:value, data:value} || [value,value]

options = {
 collection: {}, 
 url: '', 
 urlRoot: '', 
 parse: boolean
}
*/

var myCollection = new Backbone.Collection(model(s), {options});
/*
models = model || [model,model,model] || {model:data} || [{model:data},{model:data}];
 
options = {
 url: '', 
 model: {}, 
 comparator: function(){} || ''
}
*/

var myView = new Backbone.View({options});
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

var myRouter = new Backbone.Router({options});
/*
options = {
 routes:{}
}
*/

/*还要注意历史选项*/
Backbone.History.start({options});
/*
options = {
 pushState: boolean,
 root: '',
 hashChange: boolean,
 silent: boolean
}
*/
```

*提示：*
1. Router()构造函数能够被具现化的次数超过一次，但是，当它被给定了一个SPA的时候，通常只能被具现化一次。
2. Backbone.History()构造函数是由Backbone[库本身内部构造](http://backbonejs.org/docs/backbone.html#section-188)的，当这个库被解析的时候。
3. 请注意，正如前文提到的，所有实例中每个构造函数的原型都含有Backbone.Events。


## 利用内部Backbone extend()辅助函数创建子类Model()、Collection()、Router()和View()构造函数

用Backbone模式构建一个模型、集合、视频或路由器，经常涉及到让一个默认的Backbone构造函数继承（创建一个子类或子构造函数）你自己的域相关的属性和方法。这个步骤利用了extend()辅助函数，它是[一个属性的构造函数](http://backbonejs.org/docs/backbone.html#section-196)。不要把这个函数与underscore.js中的extend()混淆了。

总体来说，Backbone中的extend()可以完成以下功能：

* 复制构造函数继承的实例值
* 让新的子构造函数继承开发者定义的原型属性和静态属性
* 促进新的构造函数（子构造函数）与被继承的构造函数之间的原型继承
* 添加extend()辅助函数到新的子构造函数，新的子构造函数同样能够被继承，以便创建子类的连锁链
* 创建一个initialize()回调函数，能被子构造函数创建实例时调用，并设置初始化函数的上下文

有关更多Backbone extend()方法如何工作的详细内容，请仔细阅读下面的代码，详述了利用extend()函数继承一个虚构的View构造函数（与Backbone.View类似但不尽相同）时的逻辑。这段代码不完全是Backbone.js中包含的准备代码，而是一个独立的示范，从代码层讲述当Backbone.Model, Backbone.Collection, Backbone.View和Backbone.Router被子分类（我更习惯叫做一个扩展的子构造函数）时发生了什么变化。

```javascript
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
    基本上，thsi连接父类构造函数（代码中的View）与子构造函数之间的原型链*/
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
    Iam: 'subView Constructor',
    initialize: function (parameter1,parameter2) {//当subView创建了一个实例，运行初始化
        console.log('sub-constructor has been used, instance created');
        console.log('The ' + parameter1 +' '+ parameter2 + ' have been passed');
        console.log('the value of this:' + this.Iam + ', was correctly set');
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
```

理解extend()的概念以及它的作用，就能弄清楚Backbone应用程序的原理。我建议你反复测试这个部分，直到你完全了解extend()的功能和作用。如果你想快速跳过这个部分，我将本小节总结为以下这点：

* extend()能创建或继承新应用程序特定的对象属性，从而使继承的对象实例化之后将拥有这些新的实例功能与方法。


## 当被扩展的构造函数被实例化，运行初始化代码

当使用extend()扩展Backbone.Model, Backbone.Collection, Backbone.View以及Backbone.Router一个初始化函数，可以设置随时运行由被继承的构造函数创建的一个实例。基本上，初始化函数是一个回调函数，当一个实例被初始化时就被随时调用。在以下代码中，我提供了一个被继承的Backbone.Model构造函数的初始化回调函数，然后创建一个实例，依次运行初始化函数（在Backbone.Collection, Backbone.View和Backbone.Router中同样适用）。

```javascript
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
```

请注意，所有传递给被继承的构造函数的参数同时也被传递给了初始化回调函数。

```javascript
var myModel = Backbone.Model.extend({
    initialize:function(a,b,number){console.log(a,b,number)}, //log paramaters
});
new myModel({a:'a'},{b:'b'},1); //传递属性，可选项和随机参数
```

*提示：*

1. 初始化函数（this）的文本被设定给所创建的实例。
2. 在继承一个Backbone构造函数时，你应该注意这个构造函数在初始化一个实例时需要的是什么参数和什么值。比如，Backbone.Model构造函数想要的第一个参数是包含在模型中存储数据的对象（也就是属性）。第二个参数是包含初始化选项的对象。你可以添加附加的参数，简单传递给初始化函数。


## 重载被继承的构造函数

当使用extend()时，你把一个称作'constructor' 的属性作为值传递到一个函数，那么这个函数就会被替换成 extend()的属性。在下面代码中，我继承的不是Model构造函数，而是继承了我所传递的构造函数。

```javascript
var subModel = Backbone.Model.extend({
    constructor:function(){ //extend this constructor, not Model
        this.foo = 'bar';
    }
});
 
myModel = new subModel();
 
console.log(myModel.foo); //日志 bar
 
/*cid由Model构造函数设置的一个实例属性，但是日志未定义 
因为我们创建了我们自己的构造函数*/
console.log(myModel.cid);
 
/*cid属性是由Model()设置的一个实例属性，我们没有使用Model 
我们使用的是一个自定义的构造函数，所以myModel没有cid属性*/
```

在下面的代码中，myModel依旧继承了Model()原型属性，而不是实例属性（cid）。如果你重载这个构造函数，并希望保留构造函数的实例属性，你可以调用extend()，你需要在自定义的构造函数运行Backbone.[CONSTRUCTOR].apply(this, arguments)。

```javascript
var subModel = Backbone.Model.extend({
    constructor:function(){ //继承这个构造函数,而不是Model
        this.goo = 'boo';
        Backbone.Model.apply(this, arguments); //添加Model实例属性
    }
});
 
myModel = new subModel();
 
console.log(myModel.goo); //日志 boo
console.log(myModel.cid); //日志 c1, cid是一个Model实例属性
```