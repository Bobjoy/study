# CSS 预处理器与 CSS 后处理器

>
原文链接：http://caibaojian.com/css-processor.html

很给力的一篇关于CSS 预处理器和CSS后处理器的分析文章，介绍了CSS预处理器的框架（SASS、LESS和Stylus）和CSS后处理器框架（rework和postcss）。受益匪浅，文章来自[赵雷的博客](http://zhaolei.info/2014/01/04/css-preprocessor-and-postprocessor/)。

说到 CSS 预处理器，大家都很熟悉了，本文的重点是介绍从中抽出的 CSS 后处理器，这也是近一年多以来，前端社区的一些新趋势。
将 CSS 后处理器 抽象出来之后，会对 CSS 的 开发模式 带来一些变化，下面从概念开始说起。

## CSS 预处理器

广义上说，目标格式为 CSS 的 **预处理器** 是 **CSS 预处理器** ，但本文 特指 以最终生成 CSS 为目的的 [领域特定语言](http://en.wikipedia.org/wiki/Domain-specific_language)。

[`Sass`](http://sass-lang.com/)、[`LESS`](http://lesscss.org/)、[`Stylus`](http://learnboost.github.io/stylus/) 是目前最主流的 CSS 预处理器。

### 示例

下面以 `LESS` 为例：
```css
.opacity(@opacity: 100) {
  opacity: @opacity / 100;
  filter: ~"alpha(opacity=@{opacity})";
}
.sidebar {
  .opacity(50);
}
```
将以上 **DSL 源代码** (`LESS`)，编译成 **CSS** ：
```css
.sidebar {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
```
可以看到， **编译前** 与 **编译后** 是完全不同的语言。

### 实现原理

1. 取到 **DSL源代码** 的 **分析树**
2. 将含有 **动态生成** 相关节点的 **分析树** 转换为 **静态分析树**
3. 将 **静态分析树** 转换为CSS的 **静态分析树**
4. 将CSS的 **静态分析树** 转换为 **CSS代码**

现实中的 **CSS预处理器** 更复杂一点儿，因为大多功能要同时支持 **特有DSL** 与 **原生CSS** ，一件事情要同时考虑两种情况下的处理。

### 优缺点

* 优点：语言级逻辑处理，动态特性，改善项目结构
* 缺点：采用特殊语法，框架耦合度高，复杂度高


## CSS 后处理器

**CSS后处理器** 是对 CSS 进行处理，并最终生成 CSS 的 [预处理器](http://zh.wikipedia.org/wiki/%E9%A2%84%E5%A4%84%E7%90%86%E5%99%A8)，它属于广义上的 **CSS预处理器** 。

我们很久以前就在用 **CSS后处理器** 了，最典型的例子是 **CSS压缩工具** （如 [`clean-css`](https://github.com/GoalSmashers/clean-css)），只不过以前没单独拿出来说过。

还有最近比较火的 [`Autoprefixer`](https://github.com/ai/autoprefixer)，以 [Can I Use](http://caniuse.com/) 上的 浏览器支持数据 为基础，自动处理兼容性问题。

### 示例

以 Autoprefixer 为例：
```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
```
将以上 **标准CSS** ，编译为处理了兼容性的 **生产环境CSS** ：
```css
.container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
```
可以看到， **编译前** 与 **编译后** 的代码都是 CSS。

如果你使用 `Sublime Text`，可以通过 `Package Control` 安装 `Autoprefixer` 插件体验一下。

### 实现原理

1. 将 **源代码** 做为 **CSS** 解析，获得 **分析树**
2. 对 **CSS** 的 **分析树** 进行 **后处理**
3. 将 **CSS** 的 **分析树** 转换为 **CSS 代码**

### 优缺点

* 优点：使用 CSS 语法，容易进行模块化，贴近 CSS 的未来标准
* 缺点：逻辑处理能力有限


## 开发模式的变化

原来的开发模式是这样的：
> 
DSL 源代码 -> 生产环境 CSS

与原来相比，新的 **开发模式** 最大的变化是面向 **标准 CSS** 编程，将 **兼容性、优化** 部分交给 **CSS 后处理器** 自动完成：
> 
DSL 源代码 -> 标准 CSS -> 生产环境 CSS

等到众多 **CSS 未来标准** 在 **CSS 后处理器** 层面实现之后，部分项目甚至可以回归到使用 标准 CSS 编程的模式：
> 
标准 CSS（包含未来标准的后处理器实现）-> 生产环境 CSS

以下有一些简单对比：

对比项 | 预处理器 | 后处理器 | 两者同时使用
------|--------|---------|-----------
语言学习成本 | DSL | 	CSS √ | DSL
目标输出结果 | 生产环境 CSS | 标准 CSS √ | 标准 CSS √
兼容性处理耦合度 | 高，依赖 DSL 框架 | 低，依赖后处理器 √ | 低，依赖后处理器 √
可编程性 | 高，语言级逻辑处理 √ | 中，扩展 CSS 语法	 | 高，语言级逻辑处理 √

现在我推荐 **CSS 预处理器** 与 **CSS 后处理器** 同时使用，各自做他们最擅长的部分。

我当回神棍，预计以后会有这样的趋势：

* 越来越多专注于 **单一功能** 的小型 **CSS 工具库**
* **CSS 样式库** 从 **整体方案** 到 **模块化组合方案** 转变
* 部分 **CSS 未来标准** 在 **CSS 预处理器** 中得到支持
* **原生CSS** 和 **CSS 后处理器** 的组合成为新选择

## 优秀的 CSS 后处理器框架

### Rework

[`Rework`](https://github.com/reworkcss/rework) 是一个 高效、简单、易扩展 并且 模块化 的 CSS预处理器。
它在 2012 年 9 月才发布了第一个版本，是 [`Stylus`](http://learnboost.github.io/stylus/) 的作者 TJ Holowaychuk 大神挖的新坑。

实际上，他采用的是 **CSS 后处理器** 的模型，在其之上有一个模仿 `Stylus` 风格缩进嵌套的工具 [`styl`](https://github.com/visionmedia/styl)，其 **CSS 预处理器** 部分功能是在 `Rework` 开始工作之前通过 [`css-whitespace`](https://github.com/reworkcss/css-whitespace) 实现的。

有一些基于 `Rework` 的样式库，参考了 **CSS 标准草案** 或 **CSS 标准提案** ，相当于支持了 CSS 的未来标准，如 [`rework-vars`](https://github.com/reworkcss/rework-vars)、[`rework-font-variant`](https://github.com/ianstormtaylor/rework-font-variant)、[`rework-calc`](https://github.com/reworkcss/rework-calc)、[`rework-color-function`](https://github.com/ianstormtaylor/rework-color-function) 等。

是不是听起来有点晕？这正说明它的模块化做的非常好，你可以按照实际需要，组合 CSS 框架，比如 [`Myth`](http://www.myth.io/)。

概括一下 `Rework` 的特点：

* javascript 中直接操作 **CSS 解析对象**，扩展方便
* 可以 **自由组合模块**，按需定制 **CSS 工具库**
* **CSS 后处理器** 的模型决定它的模块倾向 **CSS 未来标准**
* 除 **服务器** 端外，也支持在 **浏览器** 环境运行

`Rework` 还很年轻，还需要更多的时间积累。

### PostCSS

[`PostCSS`](http://caibaojian.com/t/postcss) 是一个 **CSS 后处理器** 框架，允许你通过 JavaScript 对 CSS 进行修改。
它的第一个版本发布于 2013 年 11 月，是从 `Autoprefixer` 项目中抽象出的框架。

`PostCSS` 有以下特点：

* 它和 `Rework` 非常相似，但提供了 **更高级的 API**，更易扩展
* 它可以在现有 **Source Map** 的基础上生成新的 **Source Map**
* 在 **原有 CSS 格式** 的保留方面做的更好，便于开发 **编辑器插件**
* 比 `Rework` 更年轻，还只有 `Autoprefixer` 一个成功案例

其实 `Autoprefixer` 最初是基于 `Rework` 做的，但后来作者有更多需求（上面的列表），就造了 `PostCSS` 这个轮子。

## 最后

**CSS 后处理器** 的出现让 **CSS 工作流** 更清晰，但现在他们还远未成熟，还有很多地方能够做的更好。

比如 `Autoprefixer` 只做语法 **Prefix** 层面的兼容，还需要一些专门处理如 **IE 滤镜兼容** 这些问题的小模块配合使用。

比如可以针对 CSS 中单独使用的 **图片** 自动做 **CSS Sprites 归类与合并** 的工作。
比如可以根据项目对 **图标字体** 字形的实际使用情况自动对字体进行 **体积优化**。

当每个模块都专注于特定的问题时，那他多数情况下要比一个大而全的集中式框架更靠谱。

或许你也可以考虑基于 `Rework` 或 `PostCSS` 写个 **CSS 后处理器** 玩玩？

***
本文是根据去年12月底，我在公司分享的内容整理出来的，这里有 [本文相关部分的幻灯片](http://zhaolei.info/slides/css-preprocessor-and-postprocessor/)，供参考。
文中提到的 **CSS 框架或样式库** 较多，无法一一举例，建议直接去官网看示例。