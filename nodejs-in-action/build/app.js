var Bigpipe=function(){this.callbacks={}};Bigpipe.prototype.ready=function(i,t){this.callbacks[i]||(this.callbacks[i]=[]),this.callbacks[i].push(t)},Bigpipe.prototype.set=function(i,t){for(var a=this.callbacks[i]||[],c=0;c<a.length;c++)a[c].call(this,t)};
window.alert("Hello World"),gulp.task("js",function(){return gulp.src("js/*.js").pipe(jshint()).pipe(jshint.reporter("default")).pipe(uglify()).pipe(concat("app.js")).pipe(gulp.dest("build"))});
$(function(){"use strict";$(document).on("pageInit","#page-ptr",function(t,n,e){var i=$(e).find(".content").on("refresh",function(t){setTimeout(function(){var t='<div class="card"><div class="card-header">标题</div><div class="card-content"><div class="card-content-inner">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div></div></div>';i.find(".card-container").prepend(t),$.pullToRefreshDone(i)},2e3)})}),$(document).on("pageInit","#page-infinite-scroll",function(t,n,e){function i(t,n){for(var e="",i=0;20>i;i++)e+='<li class="item-content"><div class="item-inner"><div class="item-title">新条目</div></div></li>';$(".infinite-scroll .list-container").append(e)}var o=!1;$(e).on("infinite",function(){o||(o=!0,setTimeout(function(){o=!1,i(),$.refreshScroller()},1e3))})}),$(document).on("pageInit","#page-photo-browser",function(t,n,e){var i=$.photoBrowser({photos:["//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg","//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg","//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg"]});$(e).on("click",".pb-standalone",function(){i.open()});var o=$.photoBrowser({photos:["//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg","//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg","//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg"],type:"popup"});$(e).on("click",".pb-popup",function(){o.open()});var c=$.photoBrowser({photos:[{url:"//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg",caption:"Caption 1 Text"},{url:"//img.alicdn.com/tps/i1/TB1SKhUHVXXXXb7XXXX0HY8HXXX-1024-1024.jpeg",caption:"Second Caption Text"},{url:"//img.alicdn.com/tps/i4/TB1AdxNHVXXXXasXpXX0HY8HXXX-1024-1024.jpeg"}],theme:"dark",type:"standalone"});$(e).on("click",".pb-standalone-captions",function(){c.open()})}),$(document).on("pageInit","#page-modal",function(t,n,e){var i=$(e).find(".content");i.on("click",".alert-text",function(){$.alert("这是一段提示消息")}),i.on("click",".alert-text-title",function(){$.alert("这是一段提示消息","这是自定义的标题!")}),i.on("click",".alert-text-title-callback",function(){$.alert("这是自定义的文案","这是自定义的标题!",function(){$.alert("你点击了确定按钮!")})}),i.on("click",".confirm-ok",function(){$.confirm("你确定吗?",function(){$.alert("你点击了确定按钮!")})}),i.on("click",".prompt-ok",function(){$.prompt("你叫什么问题?",function(t){$.alert('你输入的名字是"'+t+'"')})})}),$(document).on("pageInit","#page-action",function(t,n,e){$(e).on("click",".create-actions",function(){var t=[{text:"请选择",label:!0},{text:"卖出",bold:!0,color:"danger",onClick:function(){$.alert("你选择了“卖出“")}},{text:"买入",onClick:function(){$.alert("你选择了“买入“")}}],n=[{text:"取消",bg:"danger"}],e=[t,n];$.actions(e)})}),$(document).on("pageInit","#page-preloader",function(t,n,e){$(e).on("click",".open-preloader-title",function(){$.showPreloader("加载中..."),setTimeout(function(){$.hidePreloader()},2e3)}),$(e).on("click",".open-indicator",function(){$.showIndicator(),setTimeout(function(){$.hideIndicator()},2e3)})}),$(document).on("click",".select-color",function(t){var n=$(t.target);document.body.className="theme-"+(n.data("color")||""),n.parent().find(".active").removeClass("active"),n.addClass("active")}),$(document).on("pageInit","#page-picker",function(t,n,e){$("#picker").picker({toolbarTemplate:'<header class="bar bar-nav">        <button class="button button-link pull-left">      按钮      </button>      <button class="button button-link pull-right close-picker">      确定      </button>      <h1 class="title">标题</h1>      </header>',cols:[{textAlign:"center",values:["iPhone 4","iPhone 4S","iPhone 5","iPhone 5S","iPhone 6","iPhone 6 Plus","iPad 2","iPad Retina","iPad Air","iPad mini","iPad mini 2","iPad mini 3"]}]}),$("#picker-name").picker({toolbarTemplate:'<header class="bar bar-nav">      <button class="button button-link pull-right close-picker">确定</button>      <h1 class="title">请选择称呼</h1>      </header>',cols:[{textAlign:"center",values:["赵","钱","孙","李","周","吴","郑","王"]},{textAlign:"center",values:["杰伦","磊","明","小鹏","燕姿","菲菲","Baby"]},{textAlign:"center",values:["先生","小姐"]}]})}),$(document).on("pageInit","#page-datetime-picker",function(t){$("#datetime-picker").datetimePicker({toolbarTemplate:'<header class="bar bar-nav">      <button class="button button-link pull-right close-picker">确定</button>      <h1 class="title">选择日期和时间</h1>      </header>'})}),$(document).on("pageInit","#page-city-picker",function(t){$("#city-picker").cityPicker({})}),$.init()});