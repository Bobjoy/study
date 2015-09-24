# Backbone.js系列教程三：Backbone.js深入解析之框架，模型视图和Backbone

> 原文地址：http://www.gbtags.com/gb/share/1945.htm

## Backbone下的框架设想

Backbone是用于开发SPA（AKA单页应用）环境。你可能想要知道这些是什么。简单的讲，SPA就是一个加载了一个页面（index.html或者app.html）的web应用，整个应用通过自定义事件，自定义URL句柄，和异步HTTP检索，存储资源来发送到客户端，这样避免了页面的重复加载。基本上，SPA框架只加载一个HTML页面，因此JavaScript可以用于仿写/重写/编排浏览器上传统web应用框架的默认属性。

让我们检验Backbone SPA的框架假设的更多细节：

* Backbone SPAs 将应用逻辑（集合，视图，模型）存于客户端（浏览器内存）而不是服务器端。因此，Backbone框架是完全用JavaScript写的。当今，一些后端逻辑可能也用JavaScript写了。（例如 [Node.js](http://nodejs.org/)提供的RESfulAPI）
* Backbone SPAs 你想要组织这个应用在松耦合的Model-View-Whatever中。
* Backbone SPAs 在同步初始化加载一个简单web页面以后，应用程序内的任何改变将根据自定义的时间和URLs被异步处理（例如，跳转URL定义不是通过文件系统层次的，是依靠应用程序框架，逻辑和数据API）
* Backbone SPAs 基本上是通过通过他们路由和历史机制，来管理URL和浏览历史的，这机制又分为传统加载和web页面缓存。
* Backbone SPAs 数据处理和保存（也就是 CRUD 或创造，读取，更新和删除）使用RESTful JSON API。

单一页面应用利用RESTful JSON APIs是Backbone的重点。假如你已经建立了一些其他数据或者数据API不是为REST建立的，你仍旧可以从Backbone提供的视图，事件，模型以及集合逻辑中学到东西，但是你需要了解你并没有真正体会到Backbone的实际好处，因为Backbone的很多特性都是使用了RESTful JSON API。

## Backbone不关注Model-View-Whatever的Whatever（也就是MV*）

学习MV-Whatever模式并非没有道理。然而，Backbone的学习在MV-Whatever中可能会弊大于利。Backbone是一个非常小的库，你只需要学习Backbone，就可以完成MV-Whatever框架。与其将你的注意放在MV-Whatever框架的Whatever上，我反而建议你好好了解Backbone的方法，并且简单了解它的目的是为SPAs管理数据模型和视图提供帮助。我相信如果你了解了JavaScript能做什么，你就很自然的开始了解Backbone MV-Whatever了。

## Backbone是一个库而非框架

Backbone是一个JavaScript库，提供一个事件系统和一系列用于创建对象的构造函数，这些事件和对象在MV-Whatever中用于为一个单页应用来组织和同步数据。最强大的框架建立机制在Backbone被发现，假定SPA架构和RESTful JSON API在Backbone中被应用，那么它将是最强大的类框架。记住，一个框架调用你的代码，而一个库是可以被你的代码调用。Backbone，概括的说是一个构造函数库，可以被开发人员添加进应用，它不是框架!

## Backbone没有提供开发单页面、胖客户端或应用程序的所有工具

正如前文提到的，Backbone不是框架，只是应用程序开发中的一块。当构建单页面Web应用程序时，你需要用到以下列出的开发工具（列表中不包含构建RESTful JSON API服务的解决方案）：
* 构建工具/taskrunner（比如[Grunt](http://gruntjs.com/)）
* 页面管理器（比如[Bower](http://bower.io/)）
* 依赖项管理器（比如[Require.js](http://requirejs.org/)）
* UI小部件库（比如[KendoUI](http://www.kendoui.com/)）
* 测试框架/库（比如[QUnit](http://qunitjs.com/)）
* 运行测试（比如[Karma](http://karma-runner.github.io/0.8/index.html)）
* 模板方案（比如[Handlerbars](http://handlebarsjs.com/)）
* 架构方案（比如[Yeoman](http://yeoman.io/)）
* 开发服务器（比如[Node.js](http://nodejs.org/)）

如果上述工具对于你来说前所未闻，那么我建议你在学习Backbone的过程中采取利用到这些工具的第三方Backbone框架。在使用Backbone框架之前，搜索有关这些工具的具体用途，知道它们能解决哪些问题。然后再试试非框架[community extensions](http://www.gbtags.com/gb/share/1945.htm#github.com/jashkenas/backbone/wiki/Extensions,-Plugins,-Resources)。通过这项工作会让你了解到你与其他开发人员在Backbone运用方面的差距。

当对Backbone有了一定了解，并且知道上述提及的工具能解决什么问题之后，你就能发现下面这些Backbone工具集/框架集的用处了：
* [Vertebrae](http://www.gbtags.com/gb/share/1945.htm#github.com/tbranyen/vertebrae)
* [Thorax](http://thoraxjs.org/)
* [Chaplin](http://chaplinjs.org/)
* [Marionette](http://marionettejs.com/)
* [BBB (Backbone Boilerplate) ](http://www.gbtags.com/gb/share/1945.htm#github.com/backbone-boilerplate/grunt-bbb)
* [Backbone.Giraffe](http://barc.github.io/backbone.giraffe/)

但是，引用这些工具提供的额外的抽象层应当小心谨慎，这些解决方案包含大量的样板、方法，会把你搞迷糊的。我建议你先从单个工具入手，直到你对Backbone有足够的理解，并且懂得这些框架能够使用的工具有哪些。 