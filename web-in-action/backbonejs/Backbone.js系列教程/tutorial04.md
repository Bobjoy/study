# Backbone.js系列教程四：Backbone全面介绍

> 原文地址：http://www.gbtags.com/gb/share/1947.htm

## Backbone的原理

Backbone的初衷在于单页面应用程序中添加架构，尤其是在创造[DocumentCloud](http://www.gbtags.com/gb/share/1947.htm#www.documentcloud.org/home)应用程序的过程中，以避免重复性的DOM交叉以及DOM中用于保持UI同步的数据发生混乱。Backbone通过一套构造函数来完成这个步骤，于是就形成了模型、集合与视图对象，目的在于组织应用程序的数据、逻辑和显示。一旦这些对象被具现化，它们彼此之间就存在特殊的关系，共同保证了应用程序的模块化、松耦合性（利用event系统沟通）、可扩展性。

## Backbone提供应用程序架构，还能帮助构建SPAs

除了Backbone.Model()、Backbone.Collection()、and Backbone.View()构造函数（即the meat）以外，Backbone还包含以下功能，用于构建SPAs和RESTful JSON API数据保存：
* 提供路由器逻辑（即Backbone.Router），因此当URL变化的时候会引发某些具体功能；
* 提供路由器历史逻辑（即Backbone.History），因此当用户点击浏览器后退或前进按钮的时候能保证路径正确。请注意，这是一个单页面应用程序，不包含传统URLs；
* 提供同步逻辑（即Backbone.Sync），作用是面向服务器读取和存储数据；
* 提供事件系统（即Backbone.Event），使用自定义事件和事件监听器来实现models、views、collections之间的沟通；
* 提供JavaScript功能库（即Underscore.js 或者 Lo-Dash.js）。

在深刻了解models、collections、views之前，请先弄明白上述这些帮助功能。实际上，这也是本教程着重讲述的知识点之一。

## Backbone所依赖的条件

对于Backbone文档而言必不可少的是使用函数式编程实用程序库，Underscore.js或Lo-Dash.js都行。不必纠结哪一个更好，果断选择其一来用就是了，如果不用的话Backbone就不能正常工作。你实在拿不定主意的话，我告诉你用Lo-Dash.js。

除了Underscore.js或Lo-Dash.js程序库之外，Backbone还需依赖json2.js，以及[jQuery](http://jquery.com/)、[Zepto](http://zeptojs.com/)或[Ender](http://ender.jit.su/)三者之一（任何模仿jQuery API的都能工作）。如果浏览器不包含这些程序库或者不支持window.JSON，则Backbone.Router()、Backbone.View()、Backbone.History()、Backbone.Sync()都不能正常工作。就是说如果没有这些程序库的支持，Backbone中的模型和集合都只能起到部分作用。然而这类情况很少见。我认为绝大部分时候，程序库都包含在Backbone.js中的（取决于你需要什么浏览器支持）。

下例HTML文件展示的是Backbone依赖的具体表现形式：
```html
<!DOCTYPE html>
<html lang="en">
<body>
<!-- 函数式编程实用程序库 -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.3.1/lodash.underscore.js"></script>
<!-- DOM & XHR效用 -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
<!-- 老式浏览器不支持window.JSON的情况 -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.js"></script>
<!-- Backbone.js -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>
</body>
</html>
```
 通常情况下（但非必要的），在搭建web应用的时候采用一个依赖项管理器（比如[Require.js](http://requirejs.org/)），像上面那样的HTML文件示例我并不建议。确切的说，上面示例只是用于更清楚的展示Backbone依赖之间怎样衔接。我的观点是依赖项管理器应当用在搭建单页面、胖客户端边，以及web应用程序的时候。

## Backbone也可在服务端运行

Backbone对于构建应用程序非常有用，其中包括构建服务方应用程序。Backbone的开发者精心制作了该程序库，用于服务器端的应用程序开发，在[NPM](http://www.gbtags.com/gb/share/1947.htm#npmjs.org/package/backbone)网站上可以下载。其实它是基于客户端的，用在服务器端的时候需要额外添加JavaScript后端环境下运行的侧重于以客户为中心的解决方案。

## Backbone是一个顶级命名空间

Backbone对象作用在全局范围内，是一个包含Backbone代码的命名空间。具体而言，Backbone代码包含Model()、View()、Collection()、History()和Router()构造函数，还包括支持这些函数的逻辑（即Events和sync()）。代码归类如下：
```javascript
(function(){
 
    var root = this;
 
    Backbone.VERSION = '1.0.0';
 
    Backbone.Events = {//事件函数混合到任意对象};
    Backbone.Model = function() {//模型构造函数};
    Backbone.Collection = function() {//集合构造函数};
    Backbone.Router = function() {//路由器构造函数};
    Backbone.History = function() {//历史构造函数};
    Backbone.sync = function() {//同步函数};
    Backbone.View = function() {//视图函数};
 
}).call(this);
```