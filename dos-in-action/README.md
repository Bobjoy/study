# <center>Bat批处理语法简析</center>
原文：http://www.csdn123.com/html/blogs/20130721/40414.htm

## 总括：

要想运行批处理命令，首先创建一个txt文件，将其后缀名改为.bat,例如命名为my.bat, 打开cmd，切换到my.bat的目录，输入my.bat即可运行my.bat中写入的命令。最简单的测试例子，加入echo hello world即可看到hello world在cmd窗口中打印出来。

## 分类描述：

**帮助：/?**

command /?查看对应command的帮助，这个无论何时都是最权威的。

**注释：::命令，echo off命令**

程序中的注释是相当有用的，行注释在行首加上::，例子如下
```
::这是一个注释。
```
@echo off的意思是此命令后的命令在执行的时候，不显示命令本身。

**变量：set命令**
```
set var="c:\a.txt"
echo %var%
```

**输出：echo命令，直接打印到控制台**
```
echo Hello World
```

**输入：choice命令，根据用户输入切换到不同的流程**

仔细分析这个例子，使用了choice命令来读取用户的不同输入，下面通过goto来根据不同的用户输入切换到不同的处理流程。

goto就是跳转到不同的标号中。标号的定义以:(冒号)开始，后面是标号名，例如下面的:no, :yes, :cancel, :end都是一个个的标号。为什么每一个标号要加上一个goto end呢？这是因为在跳转到标号后，程序就开始顺序执行，如果不进行跳转走，那么会继续运行到下一个标号。标号仅仅是个标记，不像函数一样，有自己的作用域范围，由大括号包括起来。标号没有范围，仅仅是标记，切记切记。非常有用的例子，希望掌握。
```
CHOICE /C  YNC /M "确认请按 Y，否请按 N，或者取消请按 C"
if errorlevel 3 goto cancel 
if errorlevel 2 goto no 
if errorlevel 1 goto yes
:no
echo no way
goto end
:yes
echo yes,please
goto end
:cancel
echo alread canceled.

:end
```

**传递参数：`%1, %2...,%9`对应用户通过命令传递的参数**

程序中使用echo %1, %2, %3，在调用的地方使用mybat param1 param2 param3，看看是不是打印出来了param1，param2，param3？

这个类似于命令中的选项。很多命令都有选项，就是这个道理。

给大家一个我很常用的功能。

我喜欢使用ultraedit来编辑日常的工作记录，日志什么的，包括我当前写的这个博客，也是用ultraedit编辑的，以下简称ue。
于是我搜索ue的安装目录，我的安装目录如下`C:\Program Files (x86)\IDM Computer Solutions\UltraEdit\Uedit32.exe`，我又研究了如果通过命令启动应用程序，找到了start命令。于是我使用`start "" "C:\Program Files (x86)\IDM Computer Solutions\UltraEdit\Uedit32.exe"` 来通过命令行启动ue，但是这个命令实在是太长了，不好记。通过bat的学习，知道可以将这条命令放在一个.bat文件中运行。于是我创建一个ue.bat文件，文件内容如下：
```
@echo off  :: 
start "" "C:\Program Files (x86)\IDM Computer Solutions\UltraEdit\Uedit32.exe"
```
但是我不可能每次都切换到ue.bat的目录中去执行ue.bat命令，于是创建一个单独的目录，将此目录加入到环境变量中，这样命令行可以搜索到这个目录中的文件，将ue.bat放入这个目录中。这样我每次启动ue就只需在cmd下敲入ue(它会自动匹配ue.exe,ue.bat等文件)就可以了。ue可以用来打开文件，我猜测ue应该可以传递参数。将上面命令后面加上%1参数，即`start "" "C:\Program Files (x86)\IDM Computer Solutions\UltraEdit\Uedit32.exe" %1`，即可，然后在cmd命令行输入ue blog.txt, 如果当前目录下有blog.txt,ue会自动打开它，如果没有，它会自动创建一个新的空白文件。相当好用。这就是应用程序传递参数的妙用。上面的start命令可以扩展开来，像我的qq，vs2008，vc，chrome等等常用的软件全都采用了如vc.bat,qq.bat上述方式，桌面快捷方式基本不怎么用了。

**条件判断：if命令**

```
=============================================== 
　@echo off 
　　set str1=abcd1233 
　　set str2=ABCD1234 
　　if %str1%==%str2% (
echo 字符串相同！
) else (
echo 字符串不相同！
) 
=============================================== 
```
请一定要注意上面的if，else的语法结构，else不允许直接是行首。超级恶心，导致我经常出现语法错误。后面我基本上就以上面这个为模板了，即使就一个句子需要执行，我也将()括着，语法就按照上面的描述写。易记不易错。

if判断有几种情况

1. 是errorlevel的判断， 上面已经示例了。
2. 是比较判断，常用的如下：  
　　== - 等于  
　　EQU - 等于  
　　NEQ - 不等于  
　　LSS - 小于  
　　LEQ - 小于或等于  
　　GTR - 大于  
　　GEQ - 大于或等于  
　　选择开关/i则不区分字符串大小写；选择not项，则对判断结果进行逻辑非。 
3. 是存在判断，就是 if exists file1 echo "file1 exists" 这样的语法结构判断文件或者目录的存在。
4. 是定义判断，判断变量是否存在，即是否已被定义。其命令格式为：  
``` 
IF [not] DEFINED variable command1 [else command2] 
```

**循环：**

1. 无开关的for语句能够对设定的范围内进行循环，是最基本的for循环语句。其命令格式为： 
　　FOR %%variable IN (set) DO command 
　　其中，%%variable是批处理程序里面的书写格式，在DOS中书写为%variable，即只有一个百分号(%)；set就是需要我们设定的循环范围，类似于C语言里
面的循环变量；do后面的command就是循环所执行的命令，即循环体。 
　　无开关for语句举例： 
　　=============================================== 
　　@echo off 
　　for %%i in (a,"b c",d) do echo %%i 
　　pause>nul 
　　=============================================== 
2. 开关/L  
    含开关/L的for语句，可以根据set里面的设置进行循环，从而实现对循环次数的直接控制。其命令格式为： 

    ```    
    FOR /L %%variable IN (start,step,end) DO command
    ```
    其中，start为开始计数的初始值，step为每次递增的值，end为结束值。当end小于start时，step需要设置为负数。 
    
    含开关/L的for语句举例(创建5个文件夹)：

    ```
    =============================================== 
    @echo off 
    for /l %%i in (1,2,10) do md %%i 
    pause 
    =============================================== 
    ```
    上例将新建5个文件夹，文件夹名称依次为1、3、5、7、9。可以发现，%%i的结束值并非end的值10，而是不大于end的一个数。 
3. 开关/F 
　　含开关/F的for语句具有最强大的功能，它能够对字符串进行操作，也能够对命令的返回值进行操作，还可以访问硬盘上的ASCII码文件，比如txt文档等
。其命令格式为： 
　　FOR /F ["options"] %%variable IN (set) DO command 
　　其中，set为("string"、'command'、file-set)中的一个；options是(eol=c、skip=n、delims=xxx、tokens=x,y,m-n、usebackq)中的一个或多个的组
合。各选项的意义参见for /f。一般情况下，使用较多的是skip、tokens、delims三个选项。 
　　含开关/F的for语句举例： 
　　=============================================== 
　　@echo off 
　　echo **No Options: 
　　for /f %%a in ("1,2,10") do echo a=%%a 
　　echo **Options tokens ^& delims: 
　　for /f "tokens=1-3 delims=," %%a in ("1,2,10") do echo a=%%a b=%%b c=%%c 
　　pause 
　　===============================================  
4、总结说来就是常用的有三种，无开关主要是用于对设定的范围进行循环，使用的场合比较少。
带开关l常用于设定循环次数的情况，例如循环10次，可以for /l %%i in (1,1,10) do ( command )这样就会循环10次。
带开关F常用于截取字符串，不过由于for，它可以对命令的结果进行批量截取。in的里面可以使用字符串，也可以使用命令的结果，也可以使用文件，相当强大，也最难用。
下面这个例子相信会让你有点感觉：
=============================================== 
　　@echo off 
　　echo 本文件夹里面的文件有： 
　　for /f "skip=5 tokens=3* delims= " %%a in ('dir') do ( 
　　if not "%%a"=="<DIR>" if not "%%b"=="字节" if not "%%b"=="可用字节" echo %%b 
　　) 
　　pause 
　　=============================================== 
解释一下这个例子，skip=5表示要跳过前5个字符，delims= 表明使用空格分隔，tokens=3*表明要取得空格分隔的第3组，以及最后一组(*表明第4组到最后).后面的%%a对应的第三组，%%b对应的*那一组。
实际还有开关/R, /D，我没有用过也没有深入了解。
截取路径参数：

截取传入的带路径的参数
Test.bat: 假设传入的参数为：c:\temp\test1.txt
则对应截取如下：下面的1表明是对应着%1，当然可以为2,3等等，与传入的参数对应即可。
echo %~d1 =>c:
echo %~dp1 =>c:\temp\
echo %~nx1 =>test1.txt
echo %~n1 =>test1
echo %~x1 =>.txt
cho 当前目录路径：%~dp0
语音声音：

mshta vbscript:createobject("sapi.spvoice").speak("好好学习Merry Christmas and Happy New Year!")(window.close)

字符串处理：

截取字符串：
set var=10203040
第一数字是位置，从哪里开始截取，第二个数字是截取的长度。
第一个数字如果是负数，则表示反方向的位置，例如-4表明从倒数第四个字符开始。
第二个数字如果无，表明是可以达到的最长的长度，位置从0开始。
echo %var:~-4,3%   ;从倒数第四个字符的位置开始截取，截取3个字符
echo %var:~0%      ;从正数第0个位置开始，即全长。
echo %var:~1%      ;从正数第一个开始，截取除第一个字符之外的全部字符
echo %var:~-2%
  ;从倒数第2个字符的位置开始截取，截取2个字符(从左向右截最长只有2个)。
替换字符串
echo %var:0=kkk%  ;0替换为kkk
echo %var:10=kkk% ;10替换为kkk
echo %var:20=kkk%
echo %var:*20=kkk% ;20之前包括20字符串都替换为kkk
简单牢骚一下： 

本文主要阐述bat基本语法，不怎么讲命令。在命令的基础上使用bat，才会真正的事半功倍。当需要进行批量处理或者重复的工作才需要用到它，简单的工作自己就简单完成就可以了。将你特别常用的命令编制成批处理文件，然后在命令行下使用，个人认为还是很不错的。像ssh登录总是需要输入机器的ip，那可以搞个批处理文件，例如ssh1，ssh2，或者ssh_wang, ssh_liu，这个里面进行真正的ssh对应的ip，敲的字符少了，工作就快了，而且不用每次都记忆那么长的ip地址。像你可能在使用一套编译环境，每次都是需要几步命令才可以完成，这个时候你也可以将要输入的命令集合组装成一个bat文件，以后就只需要一步就oK了。慢慢的你可能会积累一套自己的bat命令，虽然是一个一个的文件，但其实就是简单的命令集。你可能会忘记命令的名字，可以专门写一个简单的list.bat的命令，负责将bat目录的命令集打印到屏幕上。
list.bat内容如下，相当简单,功能是打印当前目录下的所有的bat文件名和exe文件名，将它和你的一系列的bat文件放到同一个目录，同时把目录加入到环境变量里面，你就可以进行享用它给你带来的便捷了：
@echo off
::echo "path=%~dp0"
dir  /b "%~dp0*.bat" "%~dp0*.exe"