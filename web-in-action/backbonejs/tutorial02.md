# Backbone.js系列教程二：Backbone.js深入解析之基础要求

> 原文地址：http://www.gbtags.com/gb/share/1923.htm

在网上关于Backbone的描述很少，现有的关于Backbone的内容五花八门，基本上都不同程度的提到了如何运用Backbone来实现应用程序的创建，当然也有很多的是讨论它是否匹配Model/View/Whatever。有挺多华而不实的视频教程是讲程序设计的，但其实没有什么太大的价值。我认为关键是缺少了关于Backbone本身的详细介绍，以及对于每行代码的真正用意的细节描述。有篇文档专门讲述[Backbone各部分的功能](http://lostechies.com/derickbailey/2011/12/27/the-responsibilities-of-the-%14%14various-pieces-of-backbone-js/)，在一定程度上解答了上述问题，并且提供[带有注释的源代码](http://backbonejs.org/docs/backbone.html)，还有更多相关[Backbone.js](http://backbonejs.org/)的内容介绍。这些虽然远远不够，但最起码，能换个角度带大家了解Backbone的组成部分与功能。

在这套Backbone.js解构系列教程中，我们将从代码层面验证Backbone库的功能。

具体而言，在这套教程的前一部分中我们将探讨学习Backbone的基础，介绍单页面应用程序（SPAs）所需一些关键的细节，以便能更好的掌握Backbone的组成与用途。在对SPAs有一定基础之后，我们将系统深入到Backbone代码部分各个细节，包括[Backbone.Events](http://backbonejs.org/#Events)、创建Backbone对象、[Backbone.Router()](http://backbonejs.org/#Router)、[Backbone.History()](http://backbonejs.org/#History)和[Backbone utilities](http://backbonejs.org/#Utility)。在Backbone.js解构系列教程的后半部分中，我们则会分别探讨[Backbone.Model](http://backbonejs.org/#Model)、[Backbone.View](http://backbonejs.org/#View)和[Backbone.Collection](http://backbonejs.org/#Collection)。

在这套系列教程中没有提到关于MVC、MVVM、MVP和MV-Whatever模式的深入知识，我刻意回避了任何有关这些模式的深入讨论，因为我认为Backbone是个简单的库，如果你掌握了代码功能，那么实现部分就比较顺其自然了，建立匹配你自己域名的Backbone应该不是难事。

本系列文章不是教你如何创建一个应用程序，而是采用最普通的方法跟新手讲解Backbone的知识，以及讲述Backbone.js基础的内容。此外，本文的目的也不是为了简单概述模型（Models）与视图(Views)的。

在本文中，我们会剖析Backbone主要组成部分，运用代码测试每个组分的具体功能，下面就开始吧！

## Backbone基础要求
***

### **需要具备JavaScript和DOM中级知识**

Backbone抽象化了能够由原生DOM和HTML5 JavaScript APIs完成的大量重复性的任务。正是因为这样，如果你没有用过DOM和JavaScript，那么学习Backbone的时候将会感到难度很大，过程漫长，令人沮丧。考虑到Backbone本身在实现DOM处理时需要寻求第三方解决方案（即jQuery、Ender、Zepto），如果你没有把握好原生DOM脚本和现代JavaScript APIs (例如XHR)，则很可能在过程中出错。如果不至少是个中级JavaScript开发人员，那么在学习Backbone知识和理解本文方便将会非常困难。

### **掌握HTTP、XHR和RESTful JSON APIs**

Backbone需要与某些工具一起来完成保存/同步数据到后端末节。假设一个JSON API，如果你不熟悉[HTTP](http://net.tutsplus.com/tutorials/tools-and-tips/http-the-protocol-every-web-developer-must-know-part-1/)、[XHR](http://www.gbtags.com/gb/share/1923.htm#developer.mozilla.org/en-US/docs/AJAX/Getting_Started)，不知道如何利用基于[REST](http://www.restapitutorial.com/lessons/whatisrest.html)的[JSON](http://www.gbtags.com/gb/share/1923.htm#developer.mozilla.org/en-US/docs/JSON) API从服务器读取和写入数据，你就无法理解到底Backbone能做什么，也无法体验到Backbone能帮你节省哪些步骤。

### **熟悉函数式编程库**

一旦Backbone被创建，就有一个附带的实用库叫做[Underscore.js](http://underscorejs.org/)，它的作用是提供Backbone函数式编程实用工具。Underscore.js库是独立的工具，在Backbone之外也能使用，只不过Backbone在很大程度上依赖于它。运用Underscore.js或[Lo-Dash.js](http://lodash.com/)这类实用库有助于更好的学习Backbone代码，还能帮助你理解Backbone继承和可用的[Model](http://backbonejs.org/#Model-Underscore-Methods)和[Collection](http://backbonejs.org/#Collection-Underscore-Methods)对象的功能化方法。如果你没有花时间弄清基于Underscore.js或Lo-Dash.js的编程方法，那么我建议你先花点功夫学习这类程序库。

*提示：*

* 函数编程实用程序库Lo-Dash.js是Underscore.js的一个替代。
* 最起码的，在开始学习Backbone之前，你应该对实用工具method [extend()](http://underscorejs.org/#extend)到底是做什么用的有一定的了解，它是Backbone源代码中最有用的工具方法。如果你更喜欢Lo-Dash.js，那么请注意了。Lo-Dash.js库中把extend()叫做[assign()](http://lodash.com/docs#assign)，extend()是assign()的一个别称。

### **了解Models和Views**

Backbone致力于缓解“复杂成堆的jQuery选择器与回调函数，疯狂的尝试保持HTML UI之间的数据同步”这种现象，并且真正做到了这一点。当然，创建大量事件、模型、集合和视图也是同样轻松的。在Backbone中，你可以恣意尝试，直到找到正确的方式。不过，总体理解model和view对开发者学习与运用Backbone是很有帮助的。不幸的是，哪怕得到松散的概念有关应用构架模式或者接头设计模式都是不容易的。我建议最好是粗狂的了解model和view，至少不要执着于某个特定的架构模式中，限制了对model和view的了解。如果你没有任何基础知识，下文将简要介绍Backbone中这两个词语的定义。如果你已经很了解了，那么请跳过这部分内容，我就不加以赘述了。

**Model：**一个Model通常包含应用程序的状态state（就像JSON中的data或Backbone属性），起到管理和接收状态/数据发生changes的一系列基本功能（就像[.set()](http://backbonejs.org/#Model-set)/[.get()](http://backbonejs.org/#Model-get)等methods或[change](http://backbonejs.org/#Events-catalog)等事件）。此外，在浏览器中model能够协调这些state/data组成内存，并持续的把它们传送到服务器（这个功能就是同步）。一组有序组合的models就叫做集合collection。在Backbone中，collections包含多个模型，有特定的功能。一个典型的模型示例就是一个to-do事件的数据（也就是to-do以及它的完成状态）。一系列to-do列表可以被看做为一组to-do模型的集合。如果把collection(也就是to-do集合)比喻成一张表单，表单的头文件就是model（即title、status）,表单行中的内容就是数据(即get a dog,done)。

**View：**一个Views通常呈现模型和集合中state\data交互式UI的逻辑关系。Views允许state/data脱离DOM，从而多样的Views能使用相同的模型和集合。因此，如果改变一个模型或集合中的模型，多样的Views就能监测到变化并自动更新。所以，"the truth"，或state/data没有绑定到view，而是脱离view的，具体的说，就是脱离DOM/HTML的。