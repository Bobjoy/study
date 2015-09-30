# KnockoutJS学习笔记01：KonckoutJS初体验

> 原文地址：http://www.cnblogs.com/TomXu/archive/2011/11/21/2257154.html

Konckout是一款JavaScript开发的前端MVVM框架。现在开始学习不知道算不算晚，但是项目中用到了，不学是不行的，所以从今天开始准备对KonckoutJS进行一系列简单的学习。

## 下载KnockoutJS
KonckoutJS是一个纯JS库，并且据说目前的版本（3.x），所以在使用的时候我们只需要引用Konckout的文件就行了。

我下载好了最新版本，[点击下载](http://www.qeefee.com/lib/knockoutjs/knockout-3.1.0.js)

## 在项目中使用KonckoutJS

下载完成之后，我们需要在项目中添加引用

```html
<script src="~/lib/knockoutjs/knockout-3.1.0.js"></script>
```

然后，我们来看看konckoutjs引用是否正确，写一个简单的绑定来测试：

```html
<script>
    var viewModel = function (firstName, lastName) {
        this.firstName = ko.observable(firstName);
        this.lastName = ko.observable(lastName);
        this.fullName = ko.computed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);
    }
    ko.applyBindings(new viewModel("Qi", "Fei"));
</script>
```

这是我们定义的ViewModel，接下来看看html代码：

```html
<p>姓：<input type="text" data-bind="value: firstName" /></p>
<p>名：<input type="text" data-bind="value: lastName" /></p>
<p>姓名：<span data-bind="text: fullName"></span></p>
```

这篇文章主要介绍Konckoutjs的下载和引用，下一篇将介绍Konckoutjs的绑定。