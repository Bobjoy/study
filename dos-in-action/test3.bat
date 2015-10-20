@echo off 
:start 
set /s var+=1 
echo %var%
if %var% leq 4 goto start 
pause 
