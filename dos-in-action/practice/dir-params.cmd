@echo off
:: 截取路径参数：
:: 截取传入的带路径的参数
:: Test.bat: 假设传入的参数为：c:\temp\test1.txt
:: 则对应截取如下：下面的1表明是对应着%1，当然可以为2,3等等，与传入的参数对应即可。
echo.
echo %~d1
echo %~dp1
echo %~nx1
echo %~n1
echo %~x1
echo %~dp0

mshta vbscript:createobject("sapi.spvoice").speak("你在学习linux的过程中，也许你已经接触过某个特殊符号，例如”*”，它是一个通配符号，代表零个或多个字符或数字。下面笔者就说一说常用到的特殊字符。")(window.close)

echo.