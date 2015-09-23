# Backbone.js系列教程七：Backbone.Router

> 原文地址：http://www.gbtags.com/gb/share/1971.htm

## Backbone.router()概述

一个Backbone route是一个JavaScript字符串，类似于传统认识中的URL路径名。这个像字符串的路径名是一个函数的属性名（或引用命名函数），当在浏览器中有url与字符串匹配时被调用。举例来说，下例中的url包含路径名 "help" ，在一个单独的Backbone应用页面中它将通告Backbone调用一个函数，这个函数关联了名为‘help'的路由。
> 
http://www.hostname.com/#help

请注意，路径名"help"事实上不是一个路径名，而是一个[hash](http://en.wikipedia.org/wiki/Fragment_identifier).Backbone默认使用哈希路径，因为目前来讲它被认为是最广泛支持的解决方案，用于创建独特的URL字符串而不导致浏览器重新加载。你不再需要支持IE9或以下版本，就能让Backbone使用最新的HTML5 [history.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)，这个特点消除了使用哈希路径的必要性。history.pushState api更新了浏览器，并允许修改URL的路径名而不引起浏览器的重新加载。我在本小节的后面更详细地讨论这点。现在，让我们来看一个Backbone route实例。 在以下代码中，我创建了默认Backbone.Router()实例，然后利用route()方法定义一个"help"路由。

```javascript
//展示页面加载的时候url外观
$('#urlPL span').text(window.location.href);
 
//创建一个Backbone Router
var myRouter = new Backbone.Router();
 
//让Backbone开始监听在url上的改变
Backbone.history.start();
 
//利用路由方法创建一个帮助路由,route(route, name, callback-function)
myRouter.route('help','help',function(){
    console.log('The url hash just change to /#help');
});
 
//将url hash更改为"#help"
window.location.hash = 'help';
 
//展示哈希编码之后的url外观,注意#help
$('#url span').text(window.location.href);
```

在以上代码示例中，当哈希改变成#help，Backbone能接收到这个变化以及在#后面的所有内容，并将其匹配到一个预定义的字符串名（也就是 "help"），且被关联到一个回调函数。

路由是类似URL字符串的基本路径名,由Backbone通过字符串匹配进行监测，匹配成功后调用一个对应的函数。

*提示：*

* 路由被默认使用在[hashchange](https://developer.mozilla.org/en-US/docs/Web/Events/hashchange)事件上和hash部分中的一个url。假如Backbone配置到使用history.pushState()，并且[popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate)事件和正常路径名是可用状态，则会被使用，反之如果不可用，则默认返回hash。如果Backbone检测结果是这些事件没有一个可用，将采取轮询（[polling](http://backbonejs.org/docs/backbone.html#section-172)）这个url，监测其是否已被改变。


## 利用Backbone.history.start()启动路由管理

为了让Backbone启动管理url的变化（包括调用默认路由，监听路由，管理浏览器历史以及处理返回按钮），你需要调用Backbone.history.start()。有关本方法的详细介绍可以在Backbone.History小节中找到。现在，只需要知道Backbone必须手动告诉浏览器启动路由进程。在下面的代码中，我创建了一个 'help'路由，但是Backbone还没有开始监听url改变，直到Backbone.history.start()被调用。

```javascript
//创建一个Backbone Router
var myRouter = new Backbone.Router();
 
//利用路由方法创建一个帮助路由, route(route, name, callback-function)
myRouter.route('help','help',function(){
    console.log('The url hash just change to /#help');
});
 
//将url hash更改为"#help",但Backbone不做变化
window.location.hash = 'help';
 
//让Backbone开始监听在url上的改变
Backbone.history.start();
 
//将url hash更改为"#help", 现在路由可以工作了!
window.location.hash = 'help';
```

## Backbone初始路由

初始的路由就是当Backbone.history.start()被调用时运行的。定义初始化路由就是发送一个空字符串路由名到这个路由，表示该路由在路由开始时是默认运行的。在下面的代码中，我定义了一个初始化路由，当Backbone.history.start()调用时被调用。

```javascript
//创建一个Backbone Router
var myRouter = new Backbone.Router();
 
//创建初始路由
myRouter.route('','initialroute',function(){
    console.log('The intital route has been invoked');
});
 
//让Backbone开始监听在url上的改变，运行初始路由
Backbone.history.start();
 
//展示url外观:
$('#url span').text(window.location.href);
```

*提示：*

* 不通过调用初始化路由来启动路由，传递{silence:true}到.start()方法。

## 定义路由

本步骤将展示在Backbone.Router()实例被实例化后，利用route()方法定义路由。简单来说，定义路由不仅仅通过route()方法完成，还可以通过以下四种方法（包含了route()方法）：

### 1：当用routes选项继承Backbone.Router时

```javascript
//继承Backbone.Router()
var extendedRouter = Backbone.Router.extend({
    routes: {
        'help': 'help'
    },
    help: function () {
        console.log('The url hash just change to /#help');
    }
});
 
//创建一个Backbone Router
var myRouter = new extendedRouter();
 
//让Backbone开始监听在url上的改变
Backbone.history.start();
 
//将url hash更改为"#help"
window.location.hash = 'help';
```

### 2：当用routes选项实例化一个路由：

```javascript
//创建一个Backbone Router
var myRouter = new Backbone.Router({
    routes: {
        'help': function () {
            console.log('The url hash just change to /#help');
        }
    }
});
 
//让Backbone开始监听在url上的改变
Backbone.history.start();
 
//将url hash更改为"#help"
window.location.hash = 'help';
```

### 3：当利用route()方法创建一个实例之后：

```javascript
//创建一个Backbone Router
var myRouter = new Backbone.Router();
 
//让Backbone开始监听在url上的改变
Backbone.history.start();
 
//使用route方法创建一个帮助路由, route(route, name, callback-function)
myRouter.route('help','help',function(){
    console.log('The url hash just change to /#help');
});
 
//将url hash更改为"#help"
window.location.hash = 'help';
```

### 4：在用route()方法初始化一个实例的过程中：

```javascript
var extendedRouter = Backbone.Router.extend({
    initialize: function () {
        this.route('help', 'help'); //寻求this.help (也就是myRouter[help])
    },
    help:function(){ //将成为一个实例属性
        console.log('The url hash just change to /#help');
    }
});
 
//创建一个Backbone Router
var myRouter = new extendedRouter();
 
//让Backbone开始监听在url上的改变
Backbone.history.start();
 
//将url hash更改为"#help"
window.location.hash = 'help';
```

以上代码大家可以自己运行一下。

## 利用通配符路径名(又叫做splats或者*)运行路由

一个通配符路径名可以被用在任何路径名，来运行路径。例如，一旦某个url改变时路由'*anyURL'将被运行。

```javascript
var myRouter = new Backbone.Router();
 
Backbone.history.start();
 
myRouter.route('*anyURL','anyURL',function(){
    console.log('called anytime the url changes to any url path');
});
 
//将url hash更改为"#foo"
window.location.hash = 'foo';
//将url hash更改为"#foo/boo/bar?coo=too&noo=loo"
setTimeout(function(){window.location.hash = 'qa';},2000);
```

一旦url更改为`'help/ANYTHING/ANYTHING'`时，路由`'/help/*'`就会运行。

```javascript
var myRouter = new Backbone.Router();
 
Backbone.history.start();
 
myRouter.route('help/*anyURL','anyURL',function(){
    console.log('called anytime the url changes to any url path');
});
 
//将url hash更改为"#foo"
window.location.hash = 'help/foo';
//将url hash更改为"#/help/foo/boo/bar?coo=too&noo=loo"
setTimeout(function(){window.location.hash = 'help/foo/boo/bar?coo=too&noo=loo';},2000);
```

*提示：*

* 单独传递一个splat路由（也就是'*'），会引起Backbone抛出错误

## 从URL传递参数到路由回调函数

为了定义url部分，应该在路由字符串中的参数名称之前放置一个‘：‘。比如在下面的代码中，我传递了4个参数给search路由回调函数。

```javascript
var myRouter = new Backbone.Router();
 
Backbone.history.start();
 
myRouter.route('search/:query/:filter1-:filter2/page:page', 'search', function (query, filter1, filter2, page) {
    console.log(query, filter1, filter2, page);
});
 
//将url hash 改变为 #search/foo/today-newest/page1
window.location.hash = 'search/foo/today-newest/page1';
```

*提示：*

* 如果把url参数用‘()’括起来，那么它就成为了一个可选参数项。如果没有‘()’，那么url只会运行包含在路由字符串中定义的所有参数。

## 给route()匹配一个url的常用方式

route()方法选择性的接收一个常规表达值作为第一个参数，而不接受一个字符串值。这将能够更好的帮助你调整匹配的url。在以下代码中，我展示如何给一个路由匹配一个特定字符。

```javascript
var myRouter = new Backbone.Router();
 
Backbone.history.start();
 
myRouter.route(/(help|support|answers|qa)/,'help',function(){
    console.log('The url hash just change to /#help');
});
 
//将url hash更改为"#help"
window.location.hash = 'help';
//将url hash更改为"#qa"setTimeout(function(){window.location.hash = 'qa';},2000);
//将url更改为"#support"setTimeout(function(){window.location.hash = 'support';},4000);
```

## 路由广播一个'route:CALLBACK-NAME'嵌入事件

当一个路由匹配一个命名空间，且回调函数调用一个'route'嵌入事件，就表示被调用了的回调函数名已被Backbone广播。on()或listenTo()事件方法能被用于嵌入'route:NAMEOFCALLBACKFUNCTION'事件。

在以下代码中，当search回调函数被调用时，我利用了on()和listenTo()监听以及调用附加的回调函数。

```javascript
var myRouter = new Backbone.Router();
 
Backbone.history.start();
 
myRouter.route('search/:query', 'search', function (query) {
    console.log(query+'0');
});
 
//on()
myRouter.on('route:search',function(query){
    console.log(query+'1');
});
//listenTo()
Backbone.listenTo(myRouter,'route:search',function(query){
    console.log(query+'2');
});
 
//将url hash更改为#search/foo/today-newest/page1
window.location.hash = 'search/foo';
```

请注意on()和listenTo()可以传递任何url参数。

*提示：*

* 当路由匹配时，除了路由对象上嵌入'route:CALLBACK-NAME'事件外，还有一个'route'事件被分配。

## 利用navigate()手动导航路径

我在之前的代码示例中通过改变浏览器中Backbone监听的window.location.hash值来调用路由。利用navigate()方法，我们可以达到相同的目的。在下面的代码中，我将调用navigate()方法传递一个路由字符串到导航，而不是更新浏览器中的哈希值。

```javascript
var myRouter = new Backbone.Router();
 
Backbone.history.start();
 
myRouter.route('test/:param', 'test', function (param) {
    console.log(param);
});
 
//利用navigate()传递url,然后运行,得到日志 'foo'
myRouter.navigate('test/foo', {
    trigger: true
});
```

*提示：*

1. 默认情况下，navigate()将更新浏览器（处理历史和后退按钮）中的url，而不调用路由回调函数。为了更新浏览器中的url并调用链接附加到路由的回调函数，你必须将trigger:true选项传递给navigate()。
2. 默认情况下，navigate()是假定你想要改变url和更新浏览器历史的。如果你不想要更新浏览器历史（按下后退按钮），你可以传递replace:true选项到navigate()。这将简单替换现在的url，而不会更新浏览器历史。