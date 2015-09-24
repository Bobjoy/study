# Backbone.js系列教程八：Backbone.History

> 原文地址：http://www.gbtags.com/gb/share/1972.htm

Backbone.Router的功能是管理路由。Backbone.history是路由的一部分，负责监听和响应URL变化，包含浏览器历史的更新。Backbone.history()构造函数由Backbone库本身实例化，History()的一个实例是引用Backbone.history。这个Backbone.history对象有一个命名为start()的方法。调用这个方法通告Backbone开始监听路由并管理浏览器历史。该方法有一个选项对象提供下面的选项和值。

```javascript
Backbone.history.start({
 
/*Boolean,默认为假,true的意思是使用pushState如果可用，如果需要则退回哈希路径*/
pushState: true,
 
/*Boolean,默认为真, 值为false的意思是假如pushState为真，则意味着浏览器不支持pushState，然后
进行基于URL路径的传统浏览器重载。如果pushState为假，同时hashChange为假，
那么url的改变，然后进行基于URL路径的传统浏览器重载。*/
hashChange: false,
 
/*字符串默认为 ''，backbone假定你的服务是从根路径开始 (也就是 /)。
一个非''的值是字符串路径，你的应用程序服务就从这个字符串路径开始，并且Backbone目录指向参照根目录。*/ 
root:'',
 
/*Boolean,默认为假,值为真则意味着不运行默认路由(也就是'')。*/
silent: true
 
});
```

你或许还从来没有创建过一个History()实例，但请注意，你将经常需要调用 Backbone.history.start()，以便开始监听hashchange事件和调用回调函数。

*提示：*

1. 由于让哈希路径在IE中工作是依赖内嵌框架的，所以最好是在DOM准备好之后再调用start()。
2. 当第一次调用start()时，将运行初始化路由。当.start()被调用时的初始化路由就是目前的url，它轮流调用关联了空白字符串属性名的路由。
3. 在调用start().之前，你不需要定义所有的路由。假如你不使用初始化路由，在Backbone.Router()实例上，你可以在调用start()方法之后，通过调用route()方法定义其他路由。
4. 路由不是从一个Backbone.router()实例开始，而是从Backbone.history()实例开始的。请记住，路由对象能够定义路由，以及提供一个navigate()方法。但是为了让路由开始加载每个web页面到浏览器，你需要调用Backbone.history.start().