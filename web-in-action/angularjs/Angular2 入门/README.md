> 
Angular2是面向未来的前端web框架，与1.x版本相比，Angular2相当地颠覆。
> 
学习地址：http://www.hubwiz.com/course/5599d367a164dd0d75929c76/

# 第一课：快速上手

## Why Angular2

> Angular1.x显然非常成功，那么，为什么要剧烈地转向Angular2？

### 性能的限制
AngularJS当初是提供给`设计人员`用来快速构建HTML表单的一个内部工具。随着时间的推移，各种特性 被加入进去以适应不同场景下的应用开发。然而由于最初的`架构限制`（比如绑定和模板机制），性能的 提升已经非常困难了。

### 快速变化的WEB

在语言方面，`ECMAScript6`的标准已经完成，这意味着浏览器将很快支持例如模块、类、lambda表达式、 generator等新的特性，而这些特性将显著地改变JavaScript的开发体验。

在开发模式方面，`Web组件`也将很快实现。然而现有的框架，包括Angular1.x对WEB组件的支持都不够好。

### 移动化

想想5年前......现在的`计算模式`已经发生了显著地变化，到处都是手机和平板。Angular1.x没有针对移动 应用特别优化，并且缺少一些关键的特性，比如：缓存预编译的视图、触控支持等。

### 简单易用

说实话，Angular1.x太复杂了，学习曲线太陡峭了，这让人望而生畏。Angular团队希望在Angular2中将复杂性 封装地更好一些，让暴露出来的概念和开发接口更`简单`。

## ES6工具链
要让Angular2应用跑起来不是件轻松的事，因为它用了太多还不被当前主流浏览器支持 的技术。所以，我们需要一个`工具链`：

![toolchain](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/toolchain.jpg)

Angular2是`面向未来`的科技，要求浏览器支持ES6+，我们现在要尝试的话，需要加一些 `垫片`来抹平当前浏览器与ES6的差异：

* **systemjs** - 通用模块加载器，支持AMD、CommonJS、ES6等各种格式的JS模块加载
* **es6-module-loader** - ES6模块加载器，systemjs会自动加载这个模块
* **traceur** - ES6转码器，将ES6代码转换为当前浏览器支持的ES5代码。systemjs会自动加载 这个模块。

## 初识Angular2
写一个Angular2的Hello World应用相当简单，分三步走：

### 1. 引入Angular2预定义类型

```javascript
import {Component,View,bootstrap} from "angular2/angular2";
```

`import`是ES6的关键字，用来从模块中引入类型定义。在这里，我们从angular2模块库中引入了三个类型： Component类、View类和bootstrap函数。

### 2. 实现一个Angular2组件

实现一个Angular2组件也很简单，定义一个类，然后给这个类添加`注解`：

```javascript
@Component({selector:"ez-app"})
@View({template:"<h1>Hello,Angular2</h1>"})
class EzApp{}
```

`class`也是ES6的关键字，用来定义一个类。`@Component`和`@View`都是给类`EzApp`附加的元信息， 被称为`注解/Annotation`。

`@Component`最重要的作用是通过`selector`属性（值为CSS选择符），指定这个组件渲染到哪个DOM对象上。 `@View`最重要的作用是通过`template`属性，指定渲染的模板。

### 3. 渲染组件到DOM

将组件渲染到DOM上，需要使用`自举/bootstrap`函数：

```javascript
bootstrap(EzApp);
```

这个函数的作用就是通知Angular2框架将`EzApp`组件渲染到DOM树上。

简单吗？我知道你一定还有疑问，别着急，我们慢慢把缺失的知识点补上！

### 练习

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>hello,angular2</title>
    <!--模块加载器-->
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <!--Angular2模块库-->
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
	<script>
    	//设置模块加载规则
    	System.baseURL = document.baseURI;
		System.config({
        	map:{traceur:"lib/traceur"},
			traceurOptions: {annotations: true}
		});
	</script>	    
</head>
<body>
	<!--组件渲染锚点-->
	<my-app></my-app>
    
    <!--定义一个ES6脚本元素-->
    <script type="module">
    	//从模块库引入三个类型定义
        import {Component,View,bootstrap} from "angular2/angular2";
        
        //组件定义
        @Component({selector:"my-app"})
        @View({template:"<h1>Hello,Angular2</h1>"})
        class EzApp{}       
        
        //渲染组件
        bootstrap(EzApp);
    </script>
</body>
</html>
```
  
把@Component的selector属性改为"ez-app"，还应该改哪里可以获得和示例同样的结果？

## 注解/Annotation
你一定好奇`@Component`和`@View`到底是怎么回事。看起来像其他语言（比如python） 的`装饰器`，是这样吗？

ES6规范里没有装饰器。这其实利用了`traceur`的一个实验特性：`注解`。给一个类 加注解，等同于设置这个类的`annotations`属性：

```javascript
//注解写法
@Component({selector:"ez-app"})
class EzApp{...}
```

等同于:

```javascript
class EzApp{...}
EzApp.annotations = [new Component({selector:"ez-app"})];
```

很显然，注解可以看做编译器（traceur）层面的`语法糖`，但和python的`装饰器`不同， `注解`在编译时仅仅被放在`annotation`里，编译器并不进行解释展开 - 这个解释的工作是 Angular2完成的：

![annotation](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/annotation.jpg)

据称，`注解`的功能就是Angular2团队向traceur团队提出的，这不是traceur的默认选项， 因此你看到，我们配置systemjs在使用traceur模块时`打开注解`：

```javascript
System.config({
  map:{traceur:"lib/traceur"},
  traceurOptions: {annotations: true}
});
```

### 练习

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>hello,angular2</title>
    <!--模块加载器-->
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <!--Angular2模块库-->
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
	<script>
    	//设置模块加载规则
    	System.baseURL = document.baseURI;
		System.config({
        	map:{traceur:"lib/traceur"},
			traceurOptions: {annotations: true}
		});
	</script>	    
</head>
<body>
	<!--组件渲染锚点-->
	<my-app></my-app>
    
    <!--定义一个ES6脚本元素-->
    <script type="module">
    	//从模块库引入三个类型定义
        import {Component,View,bootstrap} from "angular2/angular2";
        
        //组件定义
        @Component({selector:"my-app"})
        @View({template:"<h1>Hello,Annotation</h1>"})
        class EzApp{}       
                
        //渲染组件
        bootstrap(EzApp);
    </script>
</body>
</html>

```

修改示例代码中的EzApp组件，不用注解实现同样的功能。

## 小结

如果你了解一点Angular1.x的`bootstrap`，可能隐约会感受到Angular2中`bootstrap`的一些 变化 - 我指的并非代码形式上的变化。

### 以组件为核心

在Angular1.x中，bootstrap是围绕`DOM元素`展开的，无论你使用ng-app还是手动执行`bootstrap()` 函数，自举过程是建立在DOM之上的。

而在Angular2中，bootstrap是围绕`组件`开始的，你定义一个组件，然后启动它。如果没有一个组件， 你甚至都没有办法使用Angular2！

### 支持多种渲染引擎

以`组件`而非`DOM`为核心，意味着Angular2在内核隔离了对DOM的依赖 - DOM仅仅作为一种`可选`的渲染引擎存在：

![render-arch](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/render-arch.jpg)

上面的图中，`DOM Render`已经实现，`Server Render`正在测试，`iOS Render`和`Android Render` 是可预料的特性，虽然我们看不到时间表。

这有点像`React`了。


# 第二课：组件开发 - 模板语法

## 最简单的模板

组件的`View注解`用来声明组件的`外观`，它最重要的属性就是`template` - 模板。 Angular2的模板是`兼容`HTML语法的，这意味着你可以使用任何标准的HTML标签编写 组件模板。

所以，在最简单的情况下，一个Angular2组件的模板由`标准的HTML元素`构成，看起来就是 一段HTML码流。Angular2将`原封不同`地渲染这段模板：

![html-template](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/html-template.jpg)

有两种方法为组件指定渲染模板：

### 1. 内联模板

可以使用组件的`View注解`中的`template`属性直接指定`内联模板`：

```javascript
@View({
    template : `<h1>hello</h1>
                <div>...</div>`
})
```

在ES6中，使用一对`符号就可以定义多行字符串，这使得编写内联的模板轻松多了。

### 2. 外部模板

也可以将模板写入一个单独的文件：

```javascript
<!--ezcomp-tpl.html-->
<h1>hello</h1>
<div>...</div>
```

然后在定义组件时，使用`templateUrl`引用`外部模板`：

```javascript
@View({
    templateUrl : "ezcomp-tpl.html"
})
```

### 练习

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>template - standard HTML</title>
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
    <script type="text/javascript" src="lib/system.config.js"></script>
</head>
<body>
	<ez-app></ez-app>
    <script type="module">
    	import {Component,View,bootstrap} from "angular2/angular2";
        
        @Component({selector : "ez-app"})
        @View({
        	template : `
            	<h1>Hello,Angular2</h1>
                <p>
                	使用ES6开发Angular2应用的一个好处就是，可以不用拼接模板字符串了。
                </p>
                <ul>
                	<li>在模板中可以使用任何标准的HTML元素</li>
                    <li>如果模板定义在单独的文件里，可以使用templateUrl引入</li>
                </ul>
            `
        })
        class EzApp{}
        
        bootstrap(EzApp);
    </script>
</body>
</html>
```

在示例的模板中，增加一个输入文本框和一个按钮！


# 第三课：组件开发 - 模板的逻辑控制

directives - 使用组件
在Angular2中，一个组件的模板内除了可以使用标准的HTML元素，也可以使用自定义的组件！

这是相当重要的特性，意味着Angular2将无偏差地对待标准的HTML元素和你自己定义的组件。这样， 你可以建立自己的领域建模语言了，这使得渲染模板和视图模型的对齐更加容易，也使得模板的语义性 更强：

![component-template](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/component-template.jpg)

声明要在模板中使用的组件

不过，在使用自定义组件之前，必需在组件的ViewAnnotation中通过directives属性声明这个组件：

@View({
    directives : [EzComp],
    template : "<ez-comp></ez-comp>"
})
你应该注意到了，directives属性的值是一个数组，这意味着，你需要在这里声明所有你需要在模板 中使用的自定义组件。

修改示例代码：
1. 增加一个EzLogo组件
2. 在EzCard组件的模板中使用这个组件


# 第三课：组件开发 - 为模板应用样式


# 第三课：组件开发 - 属性与事件


# 第三课：组件开发 - 表单输入


# 第三课：组件开发 - 调用服务


# 第三课：组件路由 - 原理与应用