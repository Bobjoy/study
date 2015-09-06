@echo off
title 命令提示符－命令行帮助信息生成器
set Name=命令行帮助信息
echo.
echo   请稍等...
>%Name%.hta echo ^<html^>
>>%Name%.hta echo ^<title^>命令提示符－命令行帮助信息^</title^>
>>%Name%.hta echo ^<HTA:APPLICATION 
>>%Name%.hta echo  APPLICATIONNAME="命令提示符－命令行帮助信息"
>>%Name%.hta echo  SCROLL="no"
>>%Name%.hta echo  INNERBORDER="no"
>>%Name%.hta echo  /^>
>>%Name%.hta echo ^<script language="VBScript"^>
>>%Name%.hta echo   window.resizeTo 900, 660
>>%Name%.hta echo   ileft=(window.screen.width-900)/2
>>%Name%.hta echo   itop=(window.screen.height-660)/2-15
>>%Name%.hta echo   window.moveTo ileft,itop
>>%Name%.hta echo ^</script^>
>>%Name%.hta echo ^<style^>
>>%Name%.hta echo a:link {color: #000000; font:18px Tahoma; text-decoration:none;}
>>%Name%.hta echo a:visited {color: #000000; font:18px Tahoma; text-decoration:none;}
>>%Name%.hta echo a:hover {color: #ffffff; background-color:0000ff;}
>>%Name%.hta echo a:active {color: #ff0000; background-color:ffffff;}
>>%Name%.hta echo em {font:18px Tahoma; color:0000ff;}^</style^>
>>%Name%.hta echo ^</style^>
>>%Name%.hta echo ^<body style="FILTER: progid:DXImageTransform.Microsoft.Gradient(gradientType=0,startColorStr=#10bfff,endColorStr=#007db2);color:#ffffff;"^>
>>%Name%.hta echo ^<table width="100%%" height="100%%" align="center" border="0" cellspacing="0" cellpadding="1" style="border: solid 1 #ffffff;"^>
>>%Name%.hta echo   ^<tr^>
>>%Name%.hta echo     ^<td width="120" height="100%%"^>
>>%Name%.hta echo     ^<span style="width:100%%;height:100%%; overflow-y: auto;"^>
>>%Name%.hta echo       ^<table align="left"^>^<tr^>^<td^>
>>%Name%.hta echo           命令列表^<br^>

echo.
for /f %%i in ('help^|findstr /i "^[a-z]"') do (
  set/a n+=1
  call set/p=  共 %%n%% 个命令，正在处理...<nul
  set /p=   <nul&set /p= <nul>"!m!. - %%i"&findstr /a:c .* "!m!. - %%i*" 2>nul&set /p=<nul
  >>%Name%.hta echo.          ^<a href="#%%i"^>%%i^</a^>^<br^>
)
>>%Name%.hta echo       ^<td^>^<tr^>^</table^>
>>%Name%.hta echo     ^</span^>
>>%Name%.hta echo     ^</td^>
>>%Name%.hta echo     ^<td^>
>>%Name%.hta echo     ^<span style="width:100%%;height:100%%; overflow-y: auto;"^>
>>%Name%.hta echo       ^<table align="left" style="font:15px Fixedsys;"^>^<tr^>^<td^>

echo.&echo.
echo   序号        - 命令名称
for /f %%i in ('help^|findstr /i "^[a-z]"') do (
  set/a m+=1
rem  call echo    %%m%%.        - %%i
    setlocal EnableDelayedExpansion
  set /p=   <nul&set /p= <nul>"!m!. - %%i"&findstr /a:c .* "!m!. - %%i*" 2>nul&set /p=<nul
    endlocal
  >>%Name%.hta echo ^</p^>^<a name="#%%i"^>^</a^>^<em^>^<u^>%%i^</u^>^</em^>^<br^>
  for /f "delims=" %%f in ('%%i/?') do (
    set "str=%%f"
    setlocal EnableDelayedExpansion
    set str=!str:  =　!
    set str=!str:^<=^&lt;!
    set str=!str:^>=^&gt;!
    >>%Name%.hta echo.　　!str!^<br^>
    endlocal
  )
    setlocal EnableDelayedExpansion
  set /p=   <nul&findstr /a:a .* "!m!. - %%i*" 2>nul&echo.&del /q "!m!. - %%i" 2>nul
    endlocal
)
>>%Name%.hta echo       ^<td^>^<tr^>^</table^>
>>%Name%.hta echo     ^</span^>
>>%Name%.hta echo     ^</td^>
>>%Name%.hta echo   ^</tr^>
>>%Name%.hta echo ^</table^>
>>%Name%.hta echo ^</body^>
>>%Name%.hta echo ^</html^>

echo.
echo   完成！按任意键打开“%Name%.hta”。
pause>nul
start %Name%.hta
exit