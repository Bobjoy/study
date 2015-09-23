# Backbone.js系列教程五：Backbone.Events

> 原文地址：http://www.gbtags.com/gb/share/1952.htm

## Backbone.Events概述

Backbone.Events对象包含的方法有助于observer设计模式和一个[调用pub/sub的可变observer模式](http://msdn.microsoft.com/en-us/magazine/hh201955.aspx)。这些功能允许Backbone创建的不同类的对象(JavaScript对象)彼此解耦而相互通信。这是通过扩展（也就是_.extend(Model.prototype, Backbone.Events);）以下构造函数而完成的，所使用的函数都属于Backbone.Events：
* Backbone.Model()
* Backbone.Collection()
* Backbone.View()
* Backbone.Router()
* Backbone.History()

如果你还是无法理解observer设计模式，也不能理解pub/sub术语的概念，不如这样想，可以把Backbone.Events中的函数看做类似于 jQuery中的 $('').on(), $('').off(), $('').trigger(),  $('').one() 方法，它们的作用是为本机或自定义事件的DOM对象添加侦听事件。

Backbone.Events对象包含以下函数，功能是创建事件，触发事件，在基于事件的对象之间创建监听关系。

* on(event, callback, context) 或 bind() 
* off(event, callback, context) 或 unbind() 
* trigger(event, arguments)
* once(event, callback, context)
* listenTo(other object, event, callback)
* stopListening(other object, event, callback)
* listenToOnce(other object, event, callback)

除了扩展上述的构造函数，Backbone命名空间对象本身也扩展(_.extend(Backbone, Backbone.Events);) Backbone.Events属性，因此整个事件系统就是可用的。比如在下例中，我创建了一个通用的sayHi事件和一个eavesdropper对象，来监听Backbone对象上触发的任意sayHi事件。

```javascript
//对Backbone对象增加一个自定义事件
Backbone.on('sayHi', function () {
    console.log('Hi');
});
 
//创建一个eavesdropper对象，用Backbone.Events继承对象
var eavesdropper = _.extend({}, Backbone.Events);
 
//令eavesdropper监听Backbone对象的自定义sayHi事件
eavesdropper.listenTo(Backbone, 'sayHi', function () {
    console.log('I heard that');
});
 
//触发/调用sayHi自定义事件
Backbone.trigger('sayHi'); //logs 'Hi' and 'I heard that'
 
/*记住Backbone通过事件来继承Backbone命名空间
(i.e. cause Backbone did this: _.extend(Backbone, Backbone.Events);)*/
```

**提示:**

请注意，在上面我演示了Backbone对象中Backbone.Events的使用方式，但是Backbone.Events的初衷是继承前面提到的Backbone构造函数，并采用允许解耦通信的模型。

## 利用Backbone.Events继承任意对象

正如前面提到的，Backbone.Events对象和Backbone命名空间对象的属性也会被混进Backbone构造函数的继承原型链中。所以，利用Backbone.Events对象提供的功能可以继承任意对象。基本上Backbone.Events是一个独立的函数集，且能够与任意旧的JavaScript对象混合。下面我将证明这一点，首先继承A对象，然后验证Backbone.Events方法也带有A的属性。

```javascript
//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
//验证A是否被Backbone.Events方法继承
console.log(Object.keys(A));
 
/*上述日志:
 
["name", "on", "once", "off", "trigger", "stopListening", "listenTo", "listenToOnce", "bind", "unbind"]
 
*/
```

## 利用on()绑定事件对象

on()方法将绑定一个回调函数来调用一个事件触发对象。在以下代码中我绑定了一个whatsMyName事件到A对象，然后触发该事件。

```javascript
//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
A.on('sayHi greet', function () {
    console.log('Hello'); 
});
 
//触发sayHi和greet, Hello会在控制台被打出两次
A.trigger('sayHi');
A.trigger('greet');
```

## on()的命名空间事件

可以通过使用冒号在命名事件名称后加上空间名称。下面我添加了两个say事件和一个特殊的空间名称，用来调用使用这些名称间隔的事件。

```javascript
//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
A.on('say:hi', function () {
    console.log('Hi'); 
});
 
A.on('say:hello', function () {
    console.log('Hello'); 
});
 
//触发say:hi和say:hello,注意我用同一个触发调用了两个事件
A.trigger('say:hi say:hello');
 
//下面这样写不能同时触发两个事件
A.trigger('say');
```

## 使用trigger()触发和传递值到一个回调函数

trigger()方法用来调用命名(即事件)的回调函数，在本小节中它被广泛的使用。传递给trigger()方法的第二个参数，是用于给回调函数提供传递值的。下面我在A触发回调函数，用于传递几个值。

```javascript
//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
 
A.on('say', function (options) {
    console.log(options[0]);
    console.log(options[1]); 
});
 
//在A触发say事件,同一行中给回调函数传递了两个字符串
A.trigger('say', ['Hello','Good Bye']);
```

*提示：*
1. 通过提供一个空格分隔的字符串作为trigger()列表里的第一个参数，就能同时触发你想调用的多个事件(也就是obj.trigger('event1 event2 event3');）。
2. 当一个事件没有真正定义在某个对象上时，也可以被触发，任何监听这个事件的对象都会被通知这个事件已被触发。

## 利用on()来设置this，组织一个回调函数

传递给on()的第三个参数，作用是设置回调函数中的this文本。下面的代码中，我在A调用了一个回调，但是把回调文本中的this值设置为B。

```javascript
//利用Backbone.Events方法继承A对象
var A = _.extend({name:'A'}, Backbone.Events);
var B = {name:'B'};
 
//当事件A调用,设置回调文本(this)为B
A.on('sayMyName', function () {
    console.log(this.name);
}, B);
 
//触发sayMyName
A.trigger('sayMyName'); //日志B，因为回调文本被修改了
```

## 利用off()删除事件和回调函数

利用off()方法能够用于从一个对象删除单个事件、回调函数或全部事件，通常有以下五种用法。

1：删除已命名的回调函数

```javascript
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
A.off('log',foo); //删除foo回调
A.trigger('log'); //日志 后台只输出bar，因为foo被删除了 
```

2：删除对象的整个事件

```javascript
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
```

3：删除所有事件中同一个已命名的回调函数

```javascript
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
```

4：删除包含特定文本的所有事件

```javascript
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
```

5：删除一个对象的所有事件和回调

```javascript
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
```
> 
提示：

在Backbone model, collection, view, 或 router对象上使用不带参数的off()函数，可以移除BackBone事件和回调中的所有内容。

## 利用listenTo()让对象B监听对象A的事件

当对象A的事件发生，利用listenTo()方法可以让对象B监听到这个事件，并调用回调函数。在下面的代码中，我让对象B来监听对象A上发生的whosListeningToMe事件，当whosListeningToMe事件发生时将调用whosListeningToMe回调函数。

```javascript
//利用Backbone.Events方法继承对象A和对象B
var A = _.extend({name:'A'}, Backbone.Events);
var B = _.extend({name:'B'}, Backbone.Events);
 
var whosListeningToMe = function(){
    console.log(this.name);
};
 
//让对象B监听对象A上被触发的whosListeningToMe事件,然后调用whosListeningToMe
B.listenTo(A, 'whosListeningToMe', whosListeningToMe);
 
A.trigger('whosListeningToMe'); //日志 B
/* 
对象A没有whosListeningToMe事件,但这个事件能够通告监听者它已经被触发
*/
```
> 
提示：

1. listenToOnce(other,callback,callback)方法是可用的，其用法类似于listenTo()，不同之处在于listenToOnce(other,callback,callback)的回调函数在被第一次调用过后就被立即移除了，所以监听只发生一次。
2. 当一个对象事件被触发，不管该对象上是否有事件处理器，任何监听这个事件的其他对象都能被通告这个事件被触发了。

## 利用stopListening()停止一个对象对另一个对象上所有事件的监听

当一个对象正在监听其他对象时，可以用stopListening()方法进行以下四种处理。

1：停止所有监听

```javascript
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
```

2：停止对某一特定对象的监听

```javascript
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
```

3：停止监听某一特定对象上的特定事件

```javascript
var A = _.extend({name:'A'}, Backbone.Events);
var B = _.extend({name:'B'}, Backbone.Events);
 
var whosListeningToMe = function(){console.log(this.name);};
 
B.listenTo(A, 'whosListeningToMe', whosListeningToMe);
 
A.trigger('whosListeningToMe'); //日志 B
 
//让对象B停止监听对象A上的某一特定事件
B.stopListening(A,'whosListeningToMe');
//日志无，因为对象B停止监听对象A上的whosListeningToMe事件
A.trigger('whosListeningToMe');
```

4：停止监听特定对象上的某一特定事件和回调

```javascript
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
```

## Backbone嵌入事件

Backbone触发以下嵌入models, collections, views和router对象的内部事件，因此我们通过Backbone事件的on()和listenTo()方法就能运用这些事件，并且有多种多样的运用方式。但现在，我们还是先来回顾一下下表中单独的事件描述，以便更清楚的了解事件在哪种情况下被触发。

model, collection, view, router以及历史对象事件

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-23/all-event.jpg)

集合对象事件

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-23/coll-event.jpg)

模型对象事件

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-23/model-event.jpg)

模型或集合对象事件

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-23/m-c-event.jpg)

路由器对象事件

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-23/router-event.jpg)

以上提到的事件，除了‘all'类型事件以外，在本节里都能找到例子详细说明对象上的事件于何种情况下被触发。为了更好掌握Backbone嵌入事件，下面我们将对‘all'事件加以详述。Backbone嵌入事件由Backbone对象触发，一旦Backbone model, collection, view, or router上的任意事件被触发，则‘all'事件就会被触发/广播。

在以下示例中我将演示一个Backbone模型，并在‘all’事件上利用on()绑定了一个回调函数。然后在模型中设定一些数据，模型将广播两个事件：一个‘change'事件和一个‘change:attribute'事件（在上面的表格中可以找到说明）。‘all’事件将被触发两次，因为当两个‘change’事件都被触发的时候，‘all’事件就被广播了两次。

```javascript
//创建一个默认的模型对象
var myModel = new Backbone.Model();
 
//绑定一个回调对象到嵌入'all'事件
myModel.on('all', function (e) {
    console.log(e);
});
 
//触发‘change'和‘change:attribute'事件,就会触发all两次
myModel.set({'test':'test'}); 
 
/*利用listenTo()可以达到相同的效果
var A = _.extend({}, Backbone.Events);
 
A.listenTo(myModel, 'all', function (e) {
    console.log(e);
});
*/
```

正如本小节第一点提到的，all事件能够捕捉到是谁触发了‘all'事件，因此我们可以记录到（日志）哪个事件触发了‘all’事件。

请注意，‘all’事件并非只针对于模型，它能被任意触发了的Backbone内嵌事件触发。然而‘change’事件是专门针对模型的。这个例子有助于宽泛理解开发Backbone应用程序过程中，如何使用所有的嵌入事件。

## Backbone.Events总结

从这一小节得到的概念是利用Backbone对象互相通信的通用模式，利用上述方法处理JavaScript对象，你就能掌握如何创建自定义事件，也可以更好的处理Backbone Models, Collections, Views,和 the Router中被触发的事件。