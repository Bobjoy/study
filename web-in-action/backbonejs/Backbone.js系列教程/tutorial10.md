# Backbone.js系列教程十：Backbone.View

> http://www.gbtags.com/gb/share/1979.htm

在前几节中我们介绍了Backbone基础知识，如果你还没有阅读过，那么我建议你从第一节开始学习——[Backbone.js系列教程一：Backbone.js初探](http://www.gbtags.com/gb/share/1920.htm)，尤其希望你能完全理解[构造Backbone对象](http://www.gbtags.com/gb/share/1960.htm)相关知识，这对于学习今后的内容有很大帮助。在接下来的几个小节中，我们将深入Backbone，讨论Backbone views、models和collections。相信大家在阅读前文之后，已经对Backbone.View、Backbone.Model、Backbone.Collection构造函数与响应的对象实例并不陌生了。在正文开始前，我先介绍一下接下来几个章节的目录。

大家普遍认为学习Backbone通常从学习模型开始，我则认为当外围部分的知识点掌握以后，由视图开始学习是最快捷的方式。我强烈建议首先学习视图，然后再尝试用数据填充视图（模型或模型集合），并利用事件将视图与数据保持同步。之后学习模型，最后是集合。在这几个部分结束之后，我们将运用所学知识运行一个[小型联络程序](http://jsfiddle.net/codylindley/Qwb9r/)，我建议你现在就先浏览一下这个代码程序，对将要学习的知识点有个大体概念。

## Backbone.View概述

大家习以为常的把一个视图看做独立于网页应用的区域，也就是说任何的UI逻辑块，当被分成几个小部分单独开发，都可以被当成一个视图。于是可以把Backbone.View当做JavaScript逻辑的容器（也就是对象）来呈现与更新这个独立的区域。请注意，一个Backbone.View并不存储数据，也不组织数据。它通常作为一个枢纽，引用模型或集合中的数据，并利用这些数据完成某些目的。

或者可以这样说，视图就是代码中汇集与控制下面这几个部分的内容：

* 数据（模型或集合中的模型）
* HTML模板
* 引用包含HTML标记的DOM元素，形成UI
* 驱动UI的事件和函数

视图的作用就是结合这些部分（包括数据、模板、DOM、事件）来呈现UI区域，关于Backbone视图有以下几个特征：

1. Backbone视图包括构建网页应用程序中一个独立的逻辑区域所需要的所有内容部分。Backbone.View对象粘合数据、模板和事件，然后呈现与再次渲染数据发生变化时的逻辑关系。
2. 视图不需要附加到一个模型或者集合（也就是数据）上。一个视图能够简单管理网页应用程序中一个独立的逻辑区域。
3. 常用示例是一个视图引用一个模板（html），或许有些人干脆就把视图当成模板，但在Backbone中的视图并不是这样的。

## 子分类与创建一个Backbone.View

我们只需要实例化一个Backbone.View的实例，就能创建一个普通的视图：

```javascript
var myView = new Backbone.View();
```

然而，在实例化一个实例之前，你还需要继承/子分类那个基本的Backbone.View，添加你自己域特定的属性。

在下面的代码中，我继承了Backbone.View构造函数，创建了一个子构造函数（子类），并让实例继承一些被定义的特殊作用域属性。

```javascript
var MyView = Backbone.View.extend({ //Note the uppercase M, it's a constructor
 
    myViewProperty : '...',
 
    myViewMethod: function () {
        return '...';
    }
});
 
var myViewInstance = new MyView(); //create instance
 
console.log(myViewInstance.myViewProperty); //logs '... '
console.log(myViewInstance.myViewMethod()); //logs '...'
```

*提示：*

* 视图实例有一个内部cid属性（myViewInstance.cid），它是创建视图时被自动分配给视图的唯一标识符。这个值来自于[_.uniqueId('view')](http://backbonejs.org/docs/backbone.html#section-120)方法。

## 利用选项配置一个Backbone.View

当在继承或实例化一个视图时，你可以传递以下的特殊属性，它们由Backbone劫持和使用：

```javascript
//继承一个view
 
var MyView = Backbone.View.extend({
 
model: {}, 
events: {} || function(){return {}}
collection: {}, 
el: '' || function(){return ''}, 
id: '', 
className: '' || function(){return ''}, 
tagName: '' || function(){return ''}, 
attributes: {'attribute':'value','attribute':'value'}
 
});
 
//实例化一个view
 
var myView = new Backbone.View({
 
model: {}, 
events: {} || function(){return {}}
collection: {}, 
el: '' || function(){return ''}, 
id: '', 
className: '' || function(){return ''}, 
tagName: '' || function(){return ''}, 
attributes: {'attribute':'value','attribute':'value'}
 
});
```

在实例化过程中，当以上特殊的视图选项作为选项被传递时，它们就成为视图实例的属性以及options属性的属性。下面的代码中，我展示了这两个过程。

```javascript
var myView = new Backbone.View({ //options...
    foo:'',
    model: {}, 
    events: {} || function(){return {}},
    collection: {}, 
    el: '' || function(){return ''}, 
    id: '', 
    className: '' || function(){return ''}, 
    tagName: '' || function(){return ''}, 
    attributes: {'attribute':'value','attribute':'value'}
});
//实例上的特殊选项
console.log(Object.keys(myView));
//special & non-special options stored on options property (e.g. foo)
console.log(Object.keys(myView.options));
```

请注意，non-special选项(也就是foo)只在options属性中体现。

## Backbone.View方法、属性和事件

Backbone视图实例包含以下[方法和属性](http://backbonejs.org/#View)：

* el
* $el
* setElement()
* attributes
* $()
* render()
* remove()
* delegateEvents()
* undelegateEvents()

在本小节中我们将检查上述所有的方法及属性。此外，视图还可以利用以下嵌入事件：

事件类型：'all'

传递给回调函数的参数：事件名

描述：这类特殊的事件响应所有被触发的事件（不仅仅是嵌入事件），并将事件名作为第一个传递参数

## Backbone视图实例化之后运行initialize()函数

所有视图实例在被实例化以后都将调用一个内部初始化函数，这个初始化函数在继承Backbone.View的过程中被定义。下面的代码中，我创建了一个视图实例，并运行一个初始化函数。

```javascript
var MyView = Backbone.View.extend({
    initialize:function(){
        console.log('initialize is invoked');
        console.log(this); //note this function is scope to the instance created
    }
});
 
//创建实例并调用初始化函数
var myViewInstance = new MyView();
```

初始化函数是一个理想的地方用于放置创建视图实例之后的运行逻辑。

*提示：*

1. 初始化函数中的this值局限于创建出的myViewInstance。
2. 初始化函数通常包含的事件，可用于监听模型与集合中的变化。

## 渲染一个视图

视图对象伴随一个默认的[render()](http://backbonejs.org/#View-render)方法以便能够被重写。这个渲染函数，是有意被用来存放创建视图时所需的逻辑。在下面代码中，我在实例化过程中，利用初始化函数调用实例渲染函数。

```javascript
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
```

正在发生的渲染不会太多，因为我们还没有把视图与一个元素节点连接到一起，不过单独的render函数已经包含了创建一个视图的逻辑。

*提示：*

* 在渲染函数里的return this可以链接到视图方法，所有的嵌入Backbone视图方法都遵循这个原则。

## 把一个元素节点与一个视图连接到一起

Backbone视图应当与一个[元素节点](http://domenlightenment.com/#3)绑定在一起，无论这个元素节点是在HTML UI或是在内存中。通常来说，当实例化一个视图时，将利用el或tagname属性把视图实例与一个元素节点连接到一起。下面代码中，我展示这两种情形。

运用CSS选择器连接一个视图与一个HTML页面中的元素节点：

```javascript
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
```

连接一个视图与内存中的一个元素节点：

```javascript
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
```

请注意，连接一个视图与一个内存中的元素节点时仍然需要定义一个el属性值，可以将el看作是一个节点。你可以设定它使用CSS选择器引用一个html页面节点，或者利用tagname属性创建一个内存中的元素节点。

*提示：*

* el属性，当连接一个视图与浏览器DOM的一个元素时，要么接收一个CSS选择器字符串（'#myView'），要么接收一个jQuery对象本身（jQuery('myView')），包装加载到浏览器HTML文档中的一个节点元素。

## 设置内存中一个元素节点的元素属性

视图选项id、className以及attributes提供属性，添加属性值到连接着一个视图的元素节点上，与此同时[tagname属性被使用](http://backbonejs.org/docs/backbone.html#section-133)。下面我使用了这三种特殊属性，用来设置连接着myViewInstance的内存节点的属性值。

```javascript
var MyView = Backbone.View.extend({
    tagname:'div',
    id: 'myView',
    className: 'views',
    attributes:{'data-foo':'foo','data-bar':'bar'},
    initialize:function(){
        this.render() //just like calling myViewInstance.render();
    },
    render:function(){
        //logs <div id="myView" class="views" data-foo="foo" data-bar="bar">
        console.log(this.el); 
    }
});
 
var myViewInstance = new MyView(); //look in render()
```

*提示：*

* 特殊属性id、className以及attributes不能用在已经存在与HTML DOM中的节点上。

## 使用jQuery包装el的简称（即`this.$el`）

无论连接着一个视图（el）的元素在内存中，或者在html页面中，Backbone都将会在元素外围设置一个jQuery包装器，你就不必再进行这个步骤了。这是在连接着视图的元素外围创建一个你自己的包装器（jQuery(`this.el`);）的简要表达形式。下面的代码中，我验证了`this.$el`代表了用jQuery方法包装el。

```javascript
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
```

## 使用jQuery局域包装el的简称（即this.$()）

Backbone提供一个简单方式，用以[执行jQuery函数局限选择连接着视图的元素](http://backbonejs.org/docs/backbone.html#section-125)。这看上去很复杂，但是使用`this.$()`是一个简单的表述方式，当在连接着视图的元素节点上执行jQuery任务时，能够不用每次都写`$(this.el).find()`或者`this.$el.find()`。在下面的代码中，我利用`this.$()`选择包含在myViewInstance中的`<span>`。

```javascript
var MyView = Backbone.View.extend({
    initialize:function(){
        this.render()
    },
    render:function(){
        //this.$()是jQuery(this.el).find('span');的简称
        //通过$('span')能够找到所有的span元素
        //使用this.$('span')只能找到/筛选出el节点中的span
        this.$('span').css('font-weight','bold'); 
    }
});
 
var myViewInstance = new MyView({el:'#myView'});
```

请注意，使用`this.$()`的时候，我们约束了jQuery只能选择el的子元素节点。这就是为什么在el中只有`<span>`用粗体CSS样式表现了。(`<div id="myView"></div>`)。

## 利用events属性为一个Backbone视图设置委托事件

Backbone为一个视图设置[委托于](http://domenlightenment.com/#11.14)el节点的事件，从继承`Backbone.View`或实例化一个视图时设定的events对象。在下面的代码中，我在继承Backbone.View时提供了一个事件对象，添加了一个click和mouseover事件到视图中的`<button>`元素。

```javascript
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
```

定义事件的格式以及事件连接的视图内部节点（也就是el内部）格式如下：

```javascript
// event: {'event selector' : 'callback function'}
 
//基于之前的调试结果:
 
'click button': 'sayHi'
 
//注意空格把事件与选择器分隔开了
```

当利用[jQuery().on()](http://api.jquery.com/on/)方法进行事件委托时，jQuery通常把事件和选择器作为同样的参数值。

*提示：*

1. 如果把选择器省略掉，那么Backbone就默认事件应当被直接绑定到el节点。这种情况下简单意味着jQuery.on()没有被传递一个用于事件委托的选择器。
2. 附件到一个事件的回调函数能够作为一个函数值，也能够作为一个视图实例方法名称，如同字符串（即sayHi）。
3. 在一个对象中，被存储在视图实例上的事件，叫做events。

## 利用setElement()把元素节点与一个视图关联起来

利用视图可用的`setElement()`方法，我们能改变关联视图的节点元素。在下面代码中，myViewInstance初始相关页面中的`<div>`，有一个id "myView"。利用`setElement()`方法，可以把myViewInstance视图关联的元素节点`<div>`的值更改为"anotherMyView"。

```javascript
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
```

在视图上运用setElement()方法时，你应当记住Backbone将删除初始元素节点上的所有事件，还将把视图设置在新的节点上（调用delegateEvents()）。这就是为什么在上面的代码示例中，第二个"Say Hi!"按钮不再响应点击事件但仍然起作用。

## 利用remove()从DOM上删除一个视图

Backbone.View的[remove()](http://api.jquery.com/remove/)方法能够调用与视图关联的元素节点jQuery remove()方法。不使用简单的调用jQuery方法（也就是this.$el.remove();），而是采用这种方法的原因是同时能够调用视图实例的stopListening()事件，删除视图的所有监听者。

在下面代码中，我设置渲染后的视图在被激活后进行自我删除。激活"invoke remove()"按钮将会引发按钮本身被删除。  

```javascript
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
```

*提示：*

1. 请记住，jQuery remove()事件将删除调用的元素，也会删除其内部所有内容。
2. Backbone依赖jQuery的remove()方法，该方法能够在删除任何元素之前，正确的删除掉所有事件。

## 利用delegateEvents()附加委托事件

实例化一个视图时，Backbone会默认的在内部调用delegetEvents()，为需要设置的所有事件引用events选项对象。如果，无论什么原因，附加到视图上的事件都将被删除，因为delegateEvents()方法就是被用来重新附加/刷新事件到视图上的。

为了演示delegateEvents()方法，在下面的代码中，我在继承或实例化视图的时候，没有设置事件进行渲染。在视图被创建以后，我将更新视图events属性，当<button>被激活时sayHi回调函数将被调用。然后我使用delegateEvents()方法附加任意事件对象中的事件到我的视图。

```javascript
var MyView = Backbone.View.extend({
    sayHi: function () {console.log('hi');}, 
    render: function () {
        this.$el.html('<button>sayHi</button>');
        $('body').append(this.el);
    },
    initialize:function(){this.render();}
});
 
var myViewInstance = new MyView(); //create view
myViewInstance.events = {'click button':'sayHi'}; //set events object
 
//需要调用delegateEvents，因为我们在视图创建之后设置事件
myViewInstance.delegateEvents();
//现在事件应当工作，能调用undelegatedEvents进行删除
```

*提示：*

1. 调用delegetEvents()将删除所有初始委托事件回调函数，然后再添加回去。从某种程度来讲，就是刷新的过程。
2. 在视图实例上调用undelegateEvents()，以便删除视图中的委托事件。

## 使用视图模板

Backbone不强制使用特殊的模板引擎或模式来渲染一个视图。然而，[underscore.js](http://underscorejs.org/#template)提供了一个模板解决方案，用于呈现复杂的源于JSON数据的大量HTML。我将利用一个小型示例为大家展示如何使用underscore.js（lodash.underscore.js）中的模板。

```javascript
var template = '<%=firstName%> <%=lastName%> / <%=telephone%>';
 
var data = {firstName: 'John',lastName: 'Doe',telephone: '111-111-1111'};
 
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
```

此处的模板用法并不表示模板的通用性，事实上，模板在构建任何的Backbone应用程序中都很常使用到。在渲染一个视图过程中，应当充分考虑到模板引擎的情况，否则视图就会被DOM操作逻辑塞满。