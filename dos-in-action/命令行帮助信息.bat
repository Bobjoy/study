@echo off&color 9f
set n=1
for /f "delims= " %%i in ('help') do set str=%%i&call :lp %%str%%
:select
cls&echo %var1%&echo %var2%&echo %var3%&echo %var4%&echo %var5%
set select=0
set /p select=请选择要读取帮助的命令序号：
for /l %%i in (1,1,71) do if "%%i"=="%select%" goto show
echo 请正确选择。&ping /n 2 127.1>nul&goto select
:show
setlocal enabledelayedexpansion
set /a a=%select%%%16,b=select/17+1
if %a% equ 0 set a=16
set list=!!var%b%!!
for /f "tokens=%a% delims= " %%i in ("%list%") do set str=%%i
set str=%str:*.=%
cls&echo %str%命令的帮助内容如下：&echo.
%str% /? | more
endlocal&pause>nul&goto :select
:lp
for %%i in (a b c d e f g h i l m p r s t v x) do if /i "%%i"=="%str:~,1%" goto loop
goto :eof
:loop
set /a m+=1,v+=1
set var=%var% %v%.%str%
set var%n%=%var%
if %m% equ 16 set var=&set /a m-=16,n+=1