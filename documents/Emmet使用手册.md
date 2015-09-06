# Emmet使用手册

#### **介绍**

Emmet (前身为 Zen Coding) 是一个能大幅度提高前端开发效率的一个工具:

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-6/37732503.jpg)

基本上，大多数的文本编辑器都会允许你存储和重用一些代码块，我们称之为“片段”。虽然片段能很好地推动你得生产力，但大多数的实现都有这样一个缺点：你必须先定义你得代码片段，并且不能再运行时进行拓展。
    
Emmet把片段这个概念提高到了一个新的层次：你可以设置CSS形式的能够动态被解析的表达式，然后根据你所输入的缩写来得到相应的内容。Emmet是很成熟的并且非常适用于编写HTML/XML 和 CSS 代码的前端开发人员，但也可以用于编程语言。


#### **使用示例：**

在编辑器中输入缩写代码：ul>li*5 ，然后按下拓展键（默认为tab），即可得到代码片段：

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```


#### **下载和安装**

1. **Emmet为大部分流行的编辑器都提供了安装插件，下面是它们的下载链接：**
    1. [Sublime Text](https://github.com/sergeche/emmet-sublime#readme)
    2. [Eclipse/Aptana](https://github.com/emmetio/emmet-eclipse#readme)
    3. [TextMate](https://github.com/emmetio/Emmet.tmplugin#readme)
    4. [Coda](https://github.com/emmetio/Emmet.codaplugin#readme)
    5. [Espresso](https://github.com/emmetio/Emmet.sugar#readme)
    6. [Chocolat](https://github.com/sergeche/emmet.chocmixin#readme)
    7. [Komodo Edit](http://community.activestate.com/xpi/zen-coding)
    8. [Notepad++](https://github.com/emmetio/npp#readme)
    9. [PSPad](https://github.com/emmetio/pspad)
    10. [textarea](https://github.com/emmetio/textarea)
    11. [CodeMirror](https://github.com/emmetio/codemirror#readme)
    12. [Brackets](https://github.com/emmetio/brackets-emmet#readme)
    13. [NetBeans](https://github.com/emmetio/netbeans#readme)
    14. [Adobe Dreamweaver](https://github.com/emmetio/dreamweaver#readme)

2. **在线编辑器的支持：**
    1. [JSFiddle](http://jsfiddle.net/)
    2. [JS Bin](http://jsbin.com/)
    3. [CodePen](http://codepen.io/)
    4. [ICEcoder](http://icecoder.net/)
    5. [Divshot](http://www.divshot.com/)
    6. [Codio](http://codio.com/)

3. **第三方插件的支持**

    下面这些编辑器的插件都是由第三方开发者所提供的，所以可能并不支持所有Emmet的功能和特性。
    1. [SynWrite](http://www.uvviewsoft.com/synwrite/)
    2. [WebStorm](http://www.jetbrains.com/webstorm/)
    3. [PhpStorm](http://www.jetbrains.com/phpstorm/)
    4. [Vim](https://github.com/mattn/emmet-vim)
    5. [HTML-Kit](http://www.htmlkit.com/)
    6. [HippoEDIT](http://wiki.hippoedit.com/plugins/emmet)
    7. [CodeLobster PHP Edition](http://www.codelobster.com/)
    8. [TinyMCE](https://github.com/e-sites/tinymce-emmet-plugin#readme)


**因为我也是Sublime Text的使用者，所以下面为大家介绍一下sublime text中Emmet的安装方法：**

* 步骤一：首先你需要为sublime text安装Package Control组件：
    1. 按Ctrl+`调出sublime text的console
    2. 粘贴以下代码到底部命令行并回车：
    
        ```python
        import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installedpackagespath();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
        ```
    3. 重启Sublime Text
    4. 在Perferences->package settings中看到package control，则表示安装成功

* 步骤二：使用Package Control安装Emmet插件：
    1. 按Ctrl+Shift+P命令板
    2. 输入install然后选择install Package，然后输入emmet找到 Emmet Css Snippets，点击就可以自动完成安装。

#### **使用方法**
emmet的使用方法也非常简单，以sublime text为例，直接在编辑器中输入HTML或CSS的代码的缩写，然后按tab键就可以拓展为完整的代码片段。（如果与已有的快捷键有冲突的话，可以自行在编辑器中将拓展键设为其他快捷键）

**语法:**

**后代：>**

缩写：`nav>ul>li`
```html
<nav><ul><li></li></ul></nav>
```

**兄弟：+**

缩写：`div+p+bq`
```html
<div></div><p></p><blockquote></blockquote>
```

**上级：^**

缩写：`div+div>p>span+em^bq`
```html
<div></div><div><p><span></span><em></em></p><blockquote></blockquote></div>
```

缩写：`div+div>p>span+em^^bq`
```html
<div></div>
<div><p><span></span><em></em></p></div>
<blockquote></blockquote>
```

**分组：()**

缩写：`div>(header>ul>li*2>a)+footer>p`
```html
<div>
    <header><ul><li><a href=""></a></li><li><a href=""></a></li></ul></header>
    <footer><p></p></footer>
</div>
```

缩写：`(div>dl>(dt+dd)*3)+footer>p`
```html
<div>
    <dl>
        <dt></dt><dd></dd>
        <dt></dt><dd></dd>
        <dt></dt><dd></dd>
    </dl>
</div>
<footer><p></p></footer>
```

**乘法：***

缩写：`ul>li*5`
```html
<ul><li></li><li></li><li></li><li></li><li></li></ul>
```

**自增符号：$**

缩写：`ul>li.item$*5`
```html
<ul>    <li class="item1"></li>    <li class="item2"></li>    <li class="item3"></li>    <li class="item4"></li>    <li class="item5"></li></ul>
```

缩写：`h$[title=item$]{Header $}*3`
```html
<h1 title="item1">Header 1</h1><h2 title="item2">Header 2</h2><h3 title="item3">Header 3</h3>
```

缩写：`ul>li.item$$$*5`
```html
<ul>    <li class="item001"></li>    <li class="item002"></li>    <li class="item003"></li>    <li class="item004"></li>    <li class="item005"></li></ul>
```

缩写：`ul>li.item$@-*5`
```html
<ul>    <li class="item5"></li>    <li class="item4"></li>    <li class="item3"></li>    <li class="item2"></li>    <li class="item1"></li></ul>
```

缩写：`ul>li.item$@3*5`
```html
<ul>    <li class="item3"></li>    <li class="item4"></li>    <li class="item5"></li>    <li class="item6"></li>    <li class="item7"></li></ul>
```

**ID和类属性**

缩写：`#header`
```html
<div id="header"></div>
```

缩写：.title
```html
<div class="title"></div>
```

缩写：form#search.wide
```html
<form id="search" class="wide"></form>
```

缩写：p.class1.class2.class3
```html
<p class="class1 class2 class3"></p>

**自定义属性**

缩写：p[title="Hello world"]
```html
<p title="Hello world"></p>
```

缩写：td[rowspan=2 colspan=3 title]
```html
<td rowspan="2" colspan="3" title=""></td>
```

缩写：[a='value1' b="value2"]
```html
<div a="value1" b="value2"></div>
```

**文本：{}**

缩写：a{Click me}
```html
<a href="">Click me</a>
```

缩写：`p>{Click }+a{here}+{ to continue}`
```html
<p>Click <a href="">here</a> to continue</p>
```

**隐式标签**
缩写：.class
```html
<div class="class"></div>
```

缩写：em>.class
```html
<em><span class="class"></span></em>
```

缩写：ul>.class
```html
<ul>    <li class="class"></li></ul>
```

缩写：table>.row>.col
```html
<table>    <tr class="row">        <td class="col"></td>    </tr></table>
```

**HTML**

所有未知的缩写都会转换成标签，例如，foo → `<foo></foo>`

缩写：!
```html
<!doctype html><html lang="en"><head>    <meta charset="UTF-8">    <title>Document</title></head><body></body></html>
```

缩写：a
```html
<a href=""></a>
```

缩写：a:link
```html
<a href="http://"></a>
```

缩写：a:mail
```html
<a href="mailto:"></a>
```

缩写：abbr
```html
<abbr title=""></abbr>
```

缩写：acronym
```html
<acronym title=""></acronym>
```

缩写：base
```html
<base href="" />
```

缩写：basefont
```html
<basefont />
```

缩写：br
```html
<br />
```

缩写：frame
```html
<frame />
```

缩写：hr
```html
<hr />
```

缩写：bdo
```html
<bdo dir=""></bdo>
```

缩写：bdo:r
```html
<bdo dir="rtl"></bdo>
```

缩写：bdo:l
```html
<bdo dir="ltr"></bdo>
```

缩写：col
```html
<col />
```

缩写：link
```html
<link rel="stylesheet" href="" />
```

缩写：link:css
```html
<link rel="stylesheet" href="style.css" />
```

缩写：link:print
```html
<link rel="stylesheet" href="print.css" media="print" />
```

缩写：link:favicon
```html
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
```

缩写：link:touch
```html
<link rel="apple-touch-icon" href="favicon.png" />
```

缩写：link:rss
```html
<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.xml" />
```

缩写：link:atom
```html
<link rel="alternate" type="application/atom+xml" title="Atom" href="atom.xml" />
```

缩写：meta
```html
<meta />
```

缩写：meta:utf
```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
```

缩写：meta:win
```html
<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />
```

缩写：meta:vp
```html
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
```

缩写：meta:compat
```html
<meta http-equiv="X-UA-Compatible" content="IE=7" />
```

缩写：style
```html
<style></style>
```

缩写：script
```html
<script></script>
```

缩写：script:src
```html
<script src=""></script>
```

缩写：img
```html
<img src="" alt="" />
```

缩写：iframe
```html
<iframe src="" frameborder="0"></iframe>
```

缩写：embed
```html
<embed src="" type="" />
```

缩写：object
```html
<object data="" type=""></object>
```

缩写：param
```html
<param name="" value="" />
```

缩写：map
```html
<map name=""></map>
```

缩写：area
```html
<area shape="" coords="" href="" alt="" />
```

缩写：area:d
```html
<area shape="default" href="" alt="" />
```

缩写：area:c
```html
<area shape="circle" coords="" href="" alt="" />
```

缩写：area:r
```html
<area shape="rect" coords="" href="" alt="" />
```

缩写：area:p
```html
<area shape="poly" coords="" href="" alt="" />
```

缩写：form
```html
<form action=""></form>
```

缩写：form:get
```html
<form action="" method="get"></form>
```

缩写：form:post
```html
<form action="" method="post"></form>
```

缩写：label
```html
<label for=""></label>
```

缩写：input
```html
<input type="text" />
```

缩写：inp
```html
<input type="text" name="" id="" />
```

缩写：input:hidden
别名：input[type=hidden name]
```html
<input type="hidden" name="" />
```

缩写：input:h
别名：input:hidden
```html
<input type="hidden" name="" />
```

缩写：input:text, input:t
别名：inp
```html
<input type="text" name="" id="" />
```

缩写：input:search
别名：inp[type=search]
```html
<input type="search" name="" id="" />
```

缩写：input:email
别名：inp[type=email]
```html
<input type="email" name="" id="" />
```

缩写：input:url
别名：inp[type=url]
```html
<input type="url" name="" id="" />
缩写：input:password
别名：inp[type=password]
```html
<input type="password" name="" id="" />
```

缩写：input:p
别名：input:password
```html
<input type="password" name="" id="" />
```

缩写：input:datetime
别名：inp[type=datetime]
```html
<input type="datetime" name="" id="" />
```

缩写：input:date
别名：inp[type=date]
```html
<input type="date" name="" id="" />
```

缩写：input:datetime-local
别名：inp[type=datetime-local]
```html
<input type="datetime-local" name="" id="" />
```

缩写：input:month
别名：inp[type=month]
```html
<input type="month" name="" id="" />
```

缩写：input:week
别名：inp[type=week]
```html
<input type="week" name="" id="" />
```

缩写：input:time
别名：inp[type=time]
```html
<input type="time" name="" id="" />
```

缩写：input:number
别名：inp[type=number]
```html
<input type="number" name="" id="" />
```

缩写：input:color
别名：inp[type=color]
```html
<input type="color" name="" id="" />
```

缩写：input:checkbox
别名：inp[type=checkbox]
```html
<input type="checkbox" name="" id="" />
```

缩写：input:c
别名：input:checkbox
```html
<input type="checkbox" name="" id="" />
```

缩写：input:radio
别名：inp[type=radio]
```html
<input type="radio" name="" id="" />
```

缩写：input:r
别名：input:radio
```html
<input type="radio" name="" id="" />
```

缩写：input:range
别名：inp[type=range]
```html
<input type="range" name="" id="" />
```

缩写：input:file
别名：inp[type=file]
```html
<input type="file" name="" id="" />
```

缩写：input:f
别名：input:file
```html
<input type="file" name="" id="" />
缩写：input:submit
```html
<input type="submit" value="" />
```

缩写：input:s
别名：input:submit
```html
<input type="submit" value="" />
```

缩写：input:image
```html
<input type="image" src="" alt="" />
```

缩写：input:i
别名：input:image
```html
<input type="image" src="" alt="" />
```

缩写：input:button
```html
<input type="button" value="" />
```

缩写：input:b
别名：input:button
```html
<input type="button" value="" />
```

缩写：isindex
```html
<isindex />
```

缩写：input:reset
别名：input:button[type=reset]
```html
<input type="reset" value="" />
```

缩写：select
```html
<select name="" id=""></select>
```

缩写：option
```html
<option value=""></option>
```

缩写：textarea
```html
<textarea name="" id="" cols="30" rows="10"></textarea>
```

缩写：menu:context
别名：menu[type=context]>
```html
<menu type="context"></menu>
```

缩写：menu:c
别名：menu:context
```html
<menu type="context"></menu>
```

缩写：menu:toolbar
别名：menu[type=toolbar]>
```html
<menu type="toolbar"></menu>
```

缩写：menu:t
别名：menu:toolbar
```html
<menu type="toolbar"></menu>
```

缩写：video
```html
<video src=""></video>
```

缩写：audio
```html
<audio src=""></audio>
```

缩写：html:xml
```html
<html xmlns="http://www.w3.org/1999/xhtml"></html>
```

缩写：keygen
```html
<keygen />
```

缩写：command
```html
<command />
```

缩写：bq
别名：blockquote
```html
<blockquote></blockquote>
```

缩写：acr
别名：acronym
```html
<acronym title=""></acronym>
```

缩写：fig
别名：figure
```html
<figure></figure>
```

缩写：figc
别名：figcaption
```html
<figcaption></figcaption>
```

缩写：ifr
别名：iframe
```html
<iframe src="" frameborder="0"></iframe>
```

缩写：emb
别名：embed
```html
<embed src="" type="" />
```

缩写：obj
别名：object
```html
<object data="" type=""></object>
```

缩写：src
别名：source
```html
<source></source>
```

缩写：cap
别名：caption
```html
<caption></caption>
```

缩写：colg
别名：colgroup
```html
<colgroup></colgroup>
```

缩写：fst, fset
别名：fieldset
```html
<fieldset></fieldset>
```

缩写：btn
别名：button
```html
<button></button>
```

缩写：btn:b
别名：button[type=button]
```html
<button type="button"></button>
```

缩写：btn:r
别名：button[type=reset]
```html
<button type="reset"></button>
```

缩写：btn:s
别名：button[type=submit]
```html
<button type="submit"></button>
```

关于更多的HTML以及CSS的缩写请查看：

<center>[下载API表](http://www.w3cplus.com/sites/default/files/baiyaimages/CheatSheet.jpg)|[直击官网文档
](http://docs.emmet.io/cheat-sheet/)</center>

特别声明：文中演示代码来自于官网API：http://docs.emmet.io/cheat-sheet/