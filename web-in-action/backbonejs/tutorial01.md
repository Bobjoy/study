# Backbone.js系列教程一 - Backbone.js简介

> 原文地址：http://www.gbtags.com/gb/share/1920.htm

JavaScript在web应用程序开发前端技术和后端技术的逻辑与运行一块占有越来越大的比重.为了帮助维护和循环访问前期逻辑和模块性，MVC模式在近几年中渐渐普及。其中一种运用广泛的MVC框架就是Backbone.js。

**Backbone中的Models（模型）、Views（视图）和Controller（控制器）**

Backbone.js包含以下几个主要功能：

1. 创建模型（以及模型集合）；
2. 创建视图；
3. 管理绑定，管理事件兼用不同的模型以及视图与框架其他部分的联系；
4. 在模型中使用观察者模式，一旦模型触发任何change事件，所有显示此模型数据的视图接受到该change事件通知，从而自动进行事件重新渲染；
5. 给DOM处理所依赖的jQuery或Zepto提供支持。

## 第一部分：模型（Models）

创建模型，首先我们创建一个包含数据的Person对象。
```javascript
Person = Backbone.Model.extend({
    // Person实例的构造函数
    initialize: function() { 
        console.log('hello world');
    }
});
 
var p = new Person();
```

很简单对吧？现在我们为这个Person对象添加一些参数，提供更多的数据，我们添加了姓名和身高属性。

```javascript
var p = new Person({name: "Matt", height:'6\'2"'});
 
console.log(p.get('name'));
```

如果我们不提供姓名和身高时，这个Person对象的这两个属性会为空，因此，我们现在为Person对象提供默认属性设置。

```javascript
Person = Backbone.Model.extend({
    initialize: function() {
        console.log('hello world');
    },
    defaults: {
        name: "Mark",
        height: "3\""
    }
});
 
var p = new Person();
p.set({name: "Matt", height: "6'2\""});
console.log(p.get("name"));
```

Backbone的绑定功能很强大，当Model数据变化的时候，能够自动的触发方法，更新视图View。

```javascript
Person = Backbone.Model.extend({
    initialize: function() {
        console.log('hello world');
 
        // 当name属性改变时，添加一个绑定函数
        this.bind("change:name", function() {
            console.log(this.get('name') + " is now the value for name");
        });
    },
    defaults: {
        name: "Bob Hope",
        height: "unknown"
    }
});
```

我们当然希望Backbone模型中的数据是有效的，因此我们添加error，validate方法来确保在创建对象前，数据是有效的。

```javascript
Person = Backbone.Model.extend({
    initialize: function() {
        console.log('hello world');
 
        this.bind("change:name", function() {
            console.log(this.get('name') + " is now the value for name");
        });
 
        //  添加一个和error错误绑定的方法，用于处理错误数据
        this.bind('error', function( model, error ) {
            console.error(error);
        });
    },
    defaults: {
        name: "Bob Hope",
        height: "unknown"
    },
    validate: function ( attributes ) {
        if( attributes.name == 'Joe' ) {
            // 返回出错信息
            return "Uh oh, you're name is Joe!";
        }
    }
});
 
var person = new Person();
person.set({name: "Joe", height:"6 feet"});
 
console.log(person.toJSON());
```

## 第二部分：视图（Views）

HTML的样式：

```html
#container
    button Load
    ul#list
 
#list-template
    li
        a(href="")
```

Backbone 调用：

```javascript
// 一个简单的模型
var Links = Backbone.Model.extend({
    data:[
        { text: "Google", href: "http://google.com" },
        { text: "Facebook", href: "http://facebook.com" },
        { text: "Youtube", href: "http://youtube.com" }
    ]
});
 
var View = Backbone.View.extend({
    // 创建构造函数
    initialize: function () {
        console.log('init');
    }
});
 
var view = new View();
 我们从视图的选项开始：

var View = Backbone.View.extend({
    // options --> 提供给构造函数的对象
    initialize: function () {
        console.log(this.options.blankOption);
    }
});
 
var view = new View({ blankOption: "empty string" });
view.blankOption /// 会在console中打出“empty string。
```

还有一些特殊预设置的options，el参数允许你将该视图附加到页面上已存在的元素。

```javascript
var View = Backbone.View.extend({
    initialize: function () {
        console.log(this.options.blankOption);
        // this.el -> #在DOM中列出
    }
});
 
var view = new View({ el: $("#list") });
```

你还可以建立一个新的元素：

```javascript
var View = Backbone.View.extend({
    initialize: function () {
        console.log(this.options.blankOption);
        // this.tagName --> create a "tagName" item in the DOM
        $('body').append(this.el)
    }
});
 
var view = new View({ tagName: 'div', className: 'class', id: '', attributes: '' }); // --> creates a div tag with class "class"
```

在这个步骤中，我们要使用一个静态的不变的目标

```javascript
var View = Backbone.View.extend({
    initialize: function () {
        console.log(this.el);
    },
    el: '#container'
});
 
var view = new View({ model: new Links() }); //from first snippet
```

然后添加一些事件操作：

```javascript
var View = Backbone.View.extend({
    initialize: function () {
        // do nothing
        // render() 会调用两次render
    },
    el: '#container',
    events: {
        "click button": "render"
    },
    render: function() { // 通常这个方法被Backbone调用 
        var data = this.model.get('data');
 
        for (var i=0, l=data.length; i&lt;l; i++){
            var li = this.template
                    .clone()
                    .find('a')
                    .attr('href', data[i].href)
                    .text(data[i].text)
                    .end();
            this.$el // <-- this.$el 是视图元素的jQuery对象, this.el 是DOM对象
                .find('ul#list').append(li);
        }
    }
});
 
var view = new View({ model: new Links()  });
```

### 第三部分：路由器（Router）

路由器提供导航和控制，让我们发出指令到Web应用程序。添加sub-URLs或标签就能进行导航，还可以通过链接快速定位应用程序准确的特征。

```javascript
var Router = Backbone.Router.extend({
    routes: {
        // 这个会匹配任何url是符合foo/<param>的，并且提供:bar: 作为参数，传输到paramtest方法中
        // : 会匹配下一个URI
        // 所以#foo/1 会调用paramtest(1)
        "foo/:bar" : "paramtest",
 
        / * 会匹配全部剩下的URI, 所以 #a/b/c 会调用 func("a/b/c")
        "*action" : "func"
    },
    func: function (action) {
        console.log(action);
    },
    paramtest:function (p) {
        console.log(p);
    }
});
 
new Router();
 
Backbone.history.start();
```

http://www.example.com/#/foo/1 触发 paramtest()
http://www.example.com/#/abcaction 触发 func()

## 第四部分：集合（Collections）

集合提供一种机制将多种实例模型组合起来，提供强大的功能特性来维护和收集数据到列表中。

```javascript
// 这是我们最初的person模型
var Person = Backbone.Model.extend({
    // initialize在我们创建Person对象时被调用
    initialize: function() {
        console.log('Person is initialized.');
    },
 
    // 默认属性
    defaults: {
        name: 'undefined',
        age: 'undefined'
    }
});
 
// 创建集合!
var People = Backbone.Collection.extend({
    // 当集合被创建时调用
    initialize: function() {
        console.log("People Collection is initialized");
    },
 
    // 定义存入集合的数据模型
    model: Person
});
 
// 创建一个新的Person对象
var person = new Person({name:"Joe"});
 
// 建立一个集合，然后将Person对象加入这个集合中
var people = new People(person);
people.add([{name:"Bob"}, {name:"Jim"}]);
 
// 在控制台中，打出这个数据模型的数据
console.log(people.toJSON());
```

于是我们就已经完成了包含了模型和视图的可用集合。

这是关于Backbone的MVC介绍，在下一篇中，我们会介绍它的具体用法