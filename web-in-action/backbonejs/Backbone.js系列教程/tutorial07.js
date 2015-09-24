/// <reference path="../.tsd/backbone/backbone.d.ts" />

'use strict';

routerTest();

/**
 * Backbone.router()概述
 */
function routerTest1(){
    // 展示页面加载的时候url外观
    $('#urlPL span').text(window.location.href);
    
    // 创建一个Backbone Router，只能实例化一个Backbone.Router
    var myRouter = new Backbone.Router();
    
    // 让Backbone开始监听在url上的改变
    Backbone.history.start();
    
    // 利用路由方法创建一个帮助路由,route(route, name, callback-function)
    myRouter.route('help','help',function(){
        console.log('The url hash just change to /#help');
    });
    
    // 将url hash更改为"#help"
    window.location.hash = 'help';
    
    // 展示哈希编码之后的url外观,注意#help
    $('#url span').text(window.location.href);
}

/**
 * 利用Backbone.history.start()启动路由管理
 */
function routerTest2() {
    console.log('========利用Backbone.history.start()启动路由管理============')
    
    // 创建一个Backbone Router，只能实例化一个Backbone.Router
    var myRouter = new Backbone.Router();
    
    //利用路由方法创建一个帮助路由, route(route, name, callback-function)
    myRouter.route('help','help',function(){
        console.log('The url hash just change to /#help');
    });
    
    //将url hash更改为"#help",但Backbone不做变化
    window.location.hash = 'help';
    
    // 让Backbone开始监听在url上的改变
    Backbone.history.start();
    
    //将url hash更改为"#help", 现在路由可以工作了!
    window.location.hash = 'help';
}

/**
 * Backbone初始路由
 */
function routerTest3() {
    console.log('========Backbone初始路由============')
    
    // 创建一个Backbone Router，只能实例化一个Backbone.Router
    var myRouter = new Backbone.Router();
    
    //创建初始路由
    myRouter.route('','initialroute',function(){
        console.log('The intital route has been invoked');
    });
    
    // 让Backbone开始监听在url上的改变
    Backbone.history.start();
    
    //展示url外观:
    $('#url span').text(window.location.href);
}

/**
 * 定义路由
 */
// 1：用routes选项继承Backbone.Router时
function routerTest41(){
    console.log('========定义路由1:当用routes选项继承Backbone.Router时============')
    
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
}

// 2：用routes选项实例化一个路由
function routerTest42(){
    console.log('========定义路由2:当用routes选项实例化一个路由============')
    
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
}

// 3：利用route()方法创建一个实例之后
function routerTest43(){
    console.log('========定义路由3:利用route()方法创建一个实例之后============')
    
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
}

// 4：在用route()方法初始化一个实例的过程中
function routerTest44(){
    console.log('========定义路由4:在用route()方法初始化一个实例的过程中============')
    
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
}

/**
 * 利用通配符路径名(又叫做splats或者*)运行路由
 */
function routerTest51(){
    console.log('========利用通配符路径名(又叫做splats或者*)运行路由============')
    
    var myRouter = new Backbone.Router();
 
    Backbone.history.start();
     
    myRouter.route('*anyURL','anyURL',function(){
        console.log('called anytime the url changes to any url path');
    });
     
    //将url hash更改为"#foo"
    window.location.hash = 'foo';
    //将url hash更改为"#foo/boo/bar?coo=too&noo=loo"
    setTimeout(function(){window.location.hash = '/foo/boo/bar?coo=too&noo=loo';},2000);
}

function routerTest52(){
    console.log('========利用通配符路径名(又叫做splats或者*)运行路由============')
    
    var myRouter = new Backbone.Router();
 
    Backbone.history.start();
     
    myRouter.route('help/*anyURL','anyURL',function(){
        console.log('called anytime the url changes to any url path');
    });
     
    //将url hash更改为"#foo"
    window.location.hash = 'help/foo';
    //将url hash更改为"#/help/foo/boo/bar?coo=too&noo=loo"
    setTimeout(function(){window.location.hash = 'help/foo/boo/bar?coo=too&noo=loo';},2000);
}

/**
 * 从URL传递参数到路由回调函数
 */
function routerTest6(){
    console.log('========从URL传递参数到路由回调函数============')
    
    var myRouter = new Backbone.Router();
     
    Backbone.history.start();
     
    myRouter.route('search/:query/:filter1-:filter2/page:page', 'search', function (query, filter1, filter2, page) {
        console.log(query, filter1, filter2, page);
    });
     
    //将url hash 改变为 #search/foo/today-newest/page1
    window.location.hash = 'search/foo/today-newest/page1';
}

/**
 * 给route()匹配一个url的常用方式
 */
function routerTest7(){
    console.log('========给route()匹配一个url的常用方式============')

    var myRouter = new Backbone.Router();
     
    Backbone.history.start();
     
    myRouter.route(/(help|support|answers|qa)/,'help',function(){
        console.log('The url hash just change to /#help');
    });
     
    //将url hash更改为"#help"
    window.location.hash = 'help';
    //将url hash更改为"#qa"
    setTimeout(function(){window.location.hash = 'qa';},2000);
    //将url更改为"#support"
    setTimeout(function(){window.location.hash = 'support';},4000);
}

/**
 * 路由广播一个'route:CALLBACK-NAME'嵌入事件
 */
function routerTest8(){
    console.log('========路由广播一个\'route:CALLBACK-NAME\'嵌入事件============')
    
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
}

/**
 * 利用navigate()手动导航路径
 */
function routerTest(){
    console.log('========利用navigate()手动导航路径============')
    
    var myRouter = new Backbone.Router();
     
    Backbone.history.start();
     
    myRouter.route('test/:param', 'test', function (param) {
        console.log(param);
    });
     
    //利用navigate()传递url,然后运行,得到日志 'foo'
    myRouter.navigate('test/foo', {
        // 默认情况下，navigate()将更新浏览器（处理历史和后退按钮）中的url，而不调用路由回调函数。
        // 为了更新浏览器中的url并调用链接附加到路由的回调函数，你必须将trigger:true选项传递给navigate()
        trigger: true
    });

}