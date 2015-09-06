# 移动平台的meta标签

> **对于桌面平台web布局中大家对meta标签再熟悉不过了，它永远位于 head 元素内部，对做SEO的朋友一定对meta有种特殊的感情吧，今天我们就来说说移动平台的meta标签，在移动平台meta标签究竟有哪些神奇的功效呢？**

1. **Meta 之 viewport**

    说到移动平台meta标签，那就不得不说一下viewport了，那么什么是viewport呢？
    
    viewport即可视区域，对于桌面浏览器而言，viewport指的就是除去所有工具栏、状态栏、滚动条等等之后用于看网页的区域。对于传统WEB页面来说，980的宽度在iphone上显示是很正常的，也是满屏的，但对于webapp而言，可能就有点问题了，在iphone上我们的webapp在竖屏下通常宽度都是320，这时我们320页面在iphone上显示成啥效果呢？有人可能认为iPhone不是320的宽度莫，感觉应该是满屏的吧，事实呢？我们来看一下如下布局在iPhone上的显示情况
    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Meta Viewport</title>
        <style type="text/css">
            div,body{
                padding:0;
                margin:0;
            }
            body{
                padding-top:100px;
                color:#fff;
            }
            div{
                width:320px;
                height:100px;
                margin:0 auto;
                background:#000;
                text-align:center;
                font:30px/100px Arial;
            }
        </style>
    </head>
    <body>
        <div>AppUE</div>
    </body>
    </html>
    ```
    在iPhone上显示如图：
    
    ![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-6/87745724.jpg)
    
    因此我们必须改变viewport，我们就有如下几种属性值可以设置：
    * width: viewport 的宽度 （范围从 200 到 10,000 ，默认为 980 像素 ）
    * height: viewport 的高度 （范围从 223 到 10,000 ）
    * initial-scale: 初始的缩放比例 （范围从>0到 10 ）
    * minimum-scale: 允许用户缩放到的最小比例
    * maximum-scale: 允许用户缩放到的最大比例
    * user-scalable: 用户是否可以手动缩放
    
    对于这些属性，我们可以设置其中的一个或者多个，并不需要你同时都设置，iPhone 会根据你设置的属性自动推算其他属性值 ，而非直接采用默认值。
    
    如果你把initial-scale=1 ，那么 width 和 height在竖屏时自动为320*356 （不是320*480 因为地址栏等都占据空间 ），横屏时自动为 480*208。类似地 ，如果你仅仅设置了 width ，就会自动推算出initial-scale 以及height。例如你设置了 width=320 ，竖屏时 initial-scale 就是 1 ，横屏时则变成 1.5 了。 那么到底这些设置如何让 Safari 知道 ？其实很简单 ，就一个 meta ，形如 ：
    ```html
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
    ```
    设置了meat后我们页面将如此呈现了：
    
    ![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-6/88209445.jpg)
    
    好了，我们就可以按全屏来布局我们的页面了，不用再担心页面显示的很小了！


2. **Meta 之 format-detection**

    ```html
    <meta name="format-detection" content="telephone=no" />
    ```
    
    你明明写的一串数字没加链接样式，而iPhone会自动把你这个文字加链接样式、并且点击这个数字还会自动拨号！想去掉这个拨号链接该如何操作呢？这时我们的meta又该大显神通了，代码如下：
    * telephone=no就禁止了把数字转化为拨号链接！
    * telephone=yes就开启了把数字转化为拨号链接，要开启转化功能，这个meta就不用写了,在默认是情况下就是开启！


3. **Meta 之 apple-mobile-web-app-capable**

    ```html
    <meta name="apple-mobile-web-app-capable" content="yes" />
    ```
    
    这meta的作用就是删除默认的苹果工具栏和菜单栏。content有两个值"yes"和"no",当我们需要显示工具栏和菜单栏时，这个行meta就不用加了，默认就是显示。

    加了该meta的情况
    
    ![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-6/97367162.jpg)
    

4. **Meta 之 apple-mobile-web-app-status-bar-style**

    ```html
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    ```
    作用是控制状态栏显示样式
    
    ```html
    status-bar-style:black
    ```
    ![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-6/32952917.jpg)
    
    ```html
    status-bar-style:black-translucent
    ```
    ![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-6/90379514.jpg)