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

## directives - 使用组件

在Angular2中，一个组件的模板内除了可以使用标准的HTML元素，也可以使用自定义的组件！

这是相当重要的特性，意味着Angular2将`无偏差`地对待标准的HTML元素和你自己定义的组件。这样， 你可以建立自己的`领域建模语言`了，这使得渲染模板和视图模型的对齐更加容易，也使得模板的语义性 更强：

![component-template](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/component-template.jpg)

### 声明要在模板中使用的组件

不过，在使用自定义组件之前，`必需`在组件的ViewAnnotation中通过`directives`属性声明这个组件：

```javascript
@View({
    directives : [EzComp],
    template : "<ez-comp></ez-comp>"
})
```

你应该注意到了，`directives`属性的值是一个`数组`，这意味着，你需要在这里声明`所有`你需要在模板 中使用的自定义组件。

### 练习

```css
div.ez-app{background:red;padding:10px;}
div.ez-card{background:green;padding:10px;}
```

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>template - component </title>
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
    <script type="text/javascript" src="lib/system.config.js"></script>
</head>
<body>
	<ez-app></ez-app>
    <script type="module">
    	import {Component,View,bootstrap} from "angular2/angular2";
        
        @Component({selector:"ez-app"})
        @View({
        	directives:[EzCard],
        	template:`
            	<div class="ez-app">
                    <h1>EzApp</h1>
                    <ez-card></ez-card>
                </div>`
        })
        class EzApp{}
        
        @Component({selector : "ez-card"})
        @View({
        	template : `
            	<div class="ez-card">
            		<h1>EzCard</h1>
                </div>`
        })
        class EzCard{}
        
        bootstrap(EzApp);
    </script>
</body>
</html>
```

修改示例代码：

1. 增加一个EzLogo组件
2. 在EzCard组件的模板中使用这个组件

## {{model}} - 文本插值

在模板中使用可以`{{表达式}}`的方式绑定组件模型中的表达式，当表达式变化时， Angular2将自动更新对应的DOM对象：

![intepolate](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/intepolate.jpg)

上图的示例中，模板声明了`h1`的内容将绑定到组件实例的`title`变量。Angular2 框架将实时检测`title`的变化，并在其变化时自动更新DOM树中`h1`的内容。

### 练习

```css
p{text-indent:30px;line-height:25px;}
```

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>template - bind model</title>
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
    <script type="text/javascript" src="lib/system.config.js"></script>
</head>
<body>
	<ez-app></ez-app>
    <script type="module">
    	import {Component,View,bootstrap} from "angular2/angular2";
        
        @Component({selector:"ez-app"})
        @View({
        	template:`
                <div>
                	<h1>{{title}}</h1>
                    <div>
                    	<span>{{date}}</span> 来源：<span>{{source}}</span>
                    </div>
                    <p>{{content}}</p>
                </div>
            `
        })
        class EzApp{
        	constructor(){
            	this.title = "证监会：对恶意做空是有监测的";
                this.date = "2015年07月11日 15:32:35";
                this.source = "北京晚报";
                this.content = `
证监会新闻发言人邓舸昨天表示，近期，证监会要求所有上市公司制定维护股价稳定的方案，举措包括大股东增持、董监高增持、公司回购、员工持股计划、股权激励等，相关方案应尽快公布，并通过交易所平台向投资者介绍生产经营管理情况、加强投资者关系管理、维护股价稳定、做好投资者沟通工作。他介绍，该措施得到了上市公司大股东的积极响应，包括北京创业板董事长俱乐部、创业板首批28家公司实际控制人、浙江24家公司董事长等多个上市公司联盟以及大连、青岛、湖南等多地上市公司集体发声，宣布通过积极增持、回购、暂不减持等方式稳定公司股价。截至9日，两市已有655家公司公布股份增持、回购计划，积极维护公司股价稳定。
				`;
            }
        }
        
        bootstrap(EzApp);
    </script>
</body>
</html>

```

修改模板，将“新闻来源”字段及内容移动到文章尾部。

## [property] - 绑定属性

在模板中，也可以使用一对`中括号`将HTML元素或组件的`属性`绑定到组件模型的某个`表达式`， 当表达式的值变化时，对应的DOM对象将自动得到更新：

![property bind](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/prop-bind.jpg)

等价的，你也可以使用`bind-`前缀进行属性绑定：

```javascript
@View({template:`<h1 bind-text-content="title"></h1>`})
```

很容易理解，通过属性，应用相关的数据流入组件，并影响组件的外观与行为。

需要注意的是，属性的值总是被当做调用者模型中的表达式进行绑定，当表达式变化时，被 调用的组件自动得到更新。如果希望将属性绑定到一个常量字符串，别忘了给字符串加引号，或者， 去掉中括号：

```javascript
//错误，Angular2将找不到表达式 Hello,Angular2
@View({template:`<h1 [text-content]="Hello,Angular2"></h1>`})
//正确，Angular2识别出常量字符串表达式 'Hello,Angular2'
@View({template:`<h1 [text-content]="'Hello,Angular2'"></h1>`})
//正确，Angular2识别出常量字符串作为属性textContent的值
@View({template:`<h1 text-content="Hello,Angular2"></h1>`})
```

### 练习

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>template - bind propery</title>
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
    <script type="text/javascript" src="lib/system.config.js"></script>
</head>
<body>
	<ez-app></ez-app>
    
    <script type="module">
    	import {bind,Component,View,bootstrap} from "angular2/angular2";

        @Component({selector:"ez-app"})
        @View({
			template:`<h1 [style.color]="color">Hello,Angular2</h1>`
		})
        class EzApp{
        	constructor(){
            	this.color = "red";
            }
        }
                
        bootstrap(EzApp);

    </script>
</body>
</html>
```

修改示例代码，使EzApp组件的标题颜色每秒钟随机变化一次！

## (event) - 监听事件

在模板中为元素添加事件监听很简单，使用一对`小括号`包裹`事件`名称，并绑定 到表达式即可：

![event-bind](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/event-bind.jpg)

上面的代码实例为DOM对象`h1`的`click`事件添加监听函数`onClick()`。

另一种等效的书写方法是在`事件`名称前加`on-`前缀：

```javascript
@View({template : `<h1 on-click="onClick()">HELLO</h1>`})
```

### 练习

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>template - bind propery</title>
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
    <script type="text/javascript" src="lib/system.config.js"></script>
</head>
<body>
	<ez-app></ez-app>
    
    <script type="module">
    	import {Component,View,bootstrap} from "angular2/angular2";

        @Component({selector:"ez-app"})
        @View({
			template:`	
            	<h1>Your turn! <b>{{sb}}</b></h1>
            	<button (click)="roulette()">ROULETTE</button>
           	`
		})
        class EzApp{
        	constructor(){
            	this.names = ["Jason","Mary","Linda","Lincoln","Albert","Jimmy"];
                this.roulette();
            }
            //轮盘赌
            roulette(){
            	var idx = parseInt(Math.random()*this.names.length);
                this.sb = this.names[idx];
            }
        }
                
        bootstrap(EzApp);

    </script>
</body>
</html>
```

修改示例代码，点击EzApp组件的h1标题时，自动变换名称！

## \#var - 局部变量

有时模板中的不同元素间可能需要互相调用，Angular2提供一种简单的语法将元素 映射为`局部变量`：添加一个以`#`或`var-`开始的属性，后续的部分表示`变量名`， 这个变量对应元素的实例。

在下面的代码示例中，我们为元素`h1`定义了一个局部变量`v_h1`，这个变量指向 该元素对应的DOM对象，你可以在模板中的其他地方调用其方法和属性：

```javascript
@View({
    template : `
        <h1 #v_h1="">hello</h1>
        <button (click)="#v_h1.textContent = 'HELLO'">test</button>
    `
})
```

如果在一个组件元素上定义局部变量，那么其对应的对象为组件的实例：

```javascript
@View({
    directives:[EzCalc],
    template : "<ez-calc #c=""></ez-calc>"
})
```

在上面的示例中，模板内的局部变量`c`指向EzCalc的实例。

### 练习

```css
b{color:red}
```

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>template - local var</title>
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
    <script type="text/javascript" src="lib/system.config.js"></script>
</head>
<body>
	<ez-app></ez-app>
    
    <script type="module">
    	import {Component,View,bootstrap} from "angular2/angular2";

        @Component({selector:"ez-app"})
        @View({
			template:`	
            	<h1>
                	<button>变色</button>
                	I choose 
                    <b #v_who>WHO?</b>
                </h1>
            	<button (click)="v_who.textContent = 'Jason'">Jason</button>
            	<button (click)="v_who.textContent = 'Mary'">Mary</button>
            	<button (click)="v_who.textContent = 'Linda'">Linda</button>
            	<button (click)="v_who.textContent = 'Lincoln'">Lincoln</button>
            	<button (click)="v_who.textContent = 'Jimmy'">Jimmy</button>
            	<button (click)="v_who.textContent = 'Albert'">Albert</button>
           	`
		})
        class EzApp{}
                
        bootstrap(EzApp);

    </script>
</body>
</html>
```

为示例代码的变色按钮添加事件监听，点击该按钮时，将EzApp组件的h1标题 变为黑色背景，白色字体！


# 第三课：组件开发 - 模板的逻辑控制

## 使用条件逻辑

有时我们需要模板的一部分内容在`满足一定条件`时才显示，比如右边示例中的`EzReader`组件， 对于试用用户，它将在正文之上额外显示一个广告：

![ngif](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-28/ngif.jpg)

这是指令`NgIf`发挥作用的场景，它评估属性`ngIf`的值是否为真，来决定是否渲染 `template`元素的内容：

```javascript
@View({
    template : `<!--根据变量trial的值决定是否显示广告图片-->
                <template [ng-if]="trial==true">
                    <img src="ad.jpg">
                </template>
                <!--以下是正文-->
                <pre>...</pre>`
})
```

Angular2同时提供了两种`语法糖`，让`NgIf`写起来更简单，下面的两种书写方法和上面 的正式语法是等效的：

```javascript
//使用template attribute
<img src="ad.jpg" template="ng-if tiral==true">
//使用*前缀
<img src="ad.jpg" *ng-if="tiral==true">
```

看起来，显然`*ng-if`的书写方法更加有人情味儿，不过无论采用哪种书写方法，都将转换 成上面的正式写法，再进行编译。

需要指出的是，`NgIf`是Angular2预置的`指令/Directive`，所以在使用之前，需要：

1. 从angular2库中`引入`NgIf类型定义
2. 在组件的ViewAnnotation中通过属性`directives`声明对该指令的引用

### 练习

```css
img{width:100%;transition:height 2s;}
```

```html
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
    <title>Interpolation</title>
    <script type="text/javascript" src="lib/system@0.16.11.js"></script>
    <script type="text/javascript" src="lib/angular2.dev.js"></script>
	<script type="text/javascript" src="lib/system.config.js"></script>
</head>
<body>
	<ez-app></ez-app>
    <script type="module">
    	//引入NgIf类型
    	import {Component,View,bootstrap,NgIf} from "angular2/angular2";
        
        @Component({selector:"ez-app"})
        @View({
        	directives:[EzReader],
        	template:`
            	<ez-reader [trial]="true"></ez-reader>
            `
        })
        class EzApp{}
        
        @Component({
        	selector : "ez-reader",
            properties:["trial"]
        })
        @View({
        	directives:[NgIf],
        	template : `
               	<img [src]="banner" *ng-if="trial==true">
                <pre>{{content}}</pre>`
        })
        class EzReader{
        	constructor(){
            	var self = this;
            	this._trial = true;
            	this.banner = "img/banner.jpg";
                this.content = `
    “没关系，我已经没有放射性了。”史强对坐在旁边的汪森说，“这两天，我让人家像洗面口袋似的翻出来洗了个遍。
这次会议本来没安排你参加，是我坚决要求请你来的，嘿。我保准咱哥俩这次准能出风头的。”

    史强说着，从会议桌上的烟灰缸中拣出一只雪茄屁股，点上后抽一口，点点头，心旷神怡地把烟徐徐吐到对面与会
者的面前，其中就有这支雪茄的原主人斯坦顿，一名美国海军陆战队上校，他向大史投去鄙夷的目光。

    这次与会的有更多的外国军人，而且都穿上了军装。在人类历史上，全世界的武装力量第一次面对共同的敌人。

    常伟思将军说：“同志们，这次与会的所有人，对目前形势都有了基本的了解，用大史的话说，信息对等了。人类
与外星侵略者的战争已经开始，虽然在四个半世纪后，我们的子孙才会真正面对来自异星的三体人侵者，我们现在与之
作战的仍是人类；但从本质上讲，这些人类的背叛者也可以看成来自地球文明之外的敌人，我们是第一次面对这样的敌人。
下一步的作战目标十分明确，就是要夺取‘审判日’号上被截留的三体信息，这些信息，可能对人类文明的存亡具有重要
意义。
				`;
            }
        }
        
        bootstrap(EzApp);
    </script>
</body>
</html>
```

修改示例代码中EzApp组件的模板，将trial属性设置为false，运行看有什么不同


# 第三课：组件开发 - 为模板应用样式


# 第三课：组件开发 - 属性与事件


# 第三课：组件开发 - 表单输入


# 第三课：组件开发 - 调用服务


# 第三课：组件路由 - 原理与应用