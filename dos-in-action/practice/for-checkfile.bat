@echo off
echo 当前目录所有文件：
for %%i in (*.*) do echo "%%i"
echo " "
echo 当前目录有txt文件：
for %%i in (*.txt) do echo "%%i"
echo " "
echo 当前目录有文件名为三个字符：
for %%i in (???.*) do echo "%%i"