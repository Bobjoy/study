# Backbone.js系列教程九：Backbone实用程序库

> 原文地址：http://www.gbtags.com/gb/share/1973.htm

## 利用Backbone.noConflict()存储和创建一个特殊的（就是自定义命名空间）引用到Backbone

当Backbone被浏览器解析时，Backbone做的第一件事就是存储一个引用到包含在全局作用域（也就是window.Backbone）中的Backbone的值。这是因为Backbone重写或占据了这个命名空间，希望给开发者机会去存储在Backbone被解析之前使用的初值。这就是Backbone.noConflict()起作用的时候了。调用Backbone.noConflict()将会返回Backbone命名空间到初始所有者，然后返回一个引用到最新解析的Backbone.js版本，于是你就可以为它创建一个新的命名空间。在下面的代码中，我在Backbone.js加载之前创建了一个虚拟的Backbone版本。并在给Backbone最新解析的版本一个新的命名空间时，利用Backbone.noConflict()确保这个版本保留Backbone引用。

```html
<script>
    this.Backbone = {
    	"I'm the previous owner of Backbone in the global scope": true
    };
</script>
```

*提示：*

* 如果你调用了Backbone.noConflict()，但不存储回调函数返回的引用值，将会丢失一个引用到浏览器解析最新的Backbone.js代码。 

```javascript
/*在加载最新Backbone.js版本之前，存储初始引用到Backbone*/
var lastBackboneParsed = Backbone.noConflict();
//验证全局作用域中的Backbone指向初始版本
console.log(Backbone["I'm the previous owner of Backbone in the global scope"]); //logs true
/*验证Backbone.js包含在新的lastBackboneParsed命名空间里，而不是在Backbone命名空间里*/
console.log(lastBackboneParsed.VERSION) //logs 1.0.0
```

## 利用Backbone.$分配DOM与XHR库

Backbone能够在内部自动依次运用在全局作用域中找到的任何版本的jQuery、Zepto或ender等用于DOM处理和XHR（也称为AJAX）的库，通过在Backbone.$中存储一个引用到这些库中的某一个。[参考说明](http://backbonejs.org/docs/backbone.html#section-9)。

如果在全局作用域中都没有找到这些库，Backbone则会尝试使用能在全局作用域中找到的任意值给$。如果你不包含之前提到的库中任何一个的话，也不使用$作为一个命名空间或其他名字定义你自己的库，就将是undefined。

当Backbone被解析之后，你还可以手动给Backbone.$提供一个值。在下面的代码中，我展示了设定Backbone.$的两种方法。

```html
<!DOCTYPE html>
<html lang="en">
<body>
<!-- 函数式编程实用程序库 -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.3.1/lodash.underscore.js"></script>
<!-- 老式浏览器没有window.JSON的情况下使用 -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.js"></script>
<!-- DOM & XHR 实用程序库 -->
<script>
//如果jQuery, Zepto和ender不需要$，Backbone将会利用以下
var $ = {version:'0.0.1',name:'MyReCreateTheWheelDOM&AJAXLib'}
</script>
<!-- Backbone.js -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>
<!-- DOM & XHR utility -->
<script>
//或者在Backbone加载之后手动设置
Backbone.$ = {version:'0.0.1',name:'MyReCreateTheWheelDOM&AJAXLib'}
</script>
</body>
</html>
```

## 小结

我曾阅读和浏览过大量关于[Backbone.js的教程](http://readlists.com/f1c7b9ca/)，没有哪一个能详细说明清楚到底Backbone.Model、Backbone.Collection和Backbone.View函数是用来干什么的。所以我写了本系列文章希望能彻底解释清楚有关Backbone的基础知识。

有了前面几篇系列文章的介绍，接下来我们将进入重要内容，关于Backbone.Model、Backbone.Collection、Backbone.View以及Backbone.sync函数的使用。