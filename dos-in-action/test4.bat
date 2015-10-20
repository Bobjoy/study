@echo off
echo 产生一个临时件 > tmp.txt
rem 下行先保存当前目录，再将c:\windoss设为当前目录
pushd e:\Demo %~dp1\nodejs
call :sub tmp.txt
rem 下行恢复前次的当前目录
popd
call :sub tmp.txt test4.bat
pause
del tmp.txt
exit
:sub
Echo 删除引号： %~1 %~2
Echo 扩充到路径： %~f1
Echo 扩充到一个驱动器号： %~d1
Echo 扩充到一个路径： %~p1
Echo 扩充到一个文件名： %~n1
Echo 扩充到一个文件扩展名： %~x1
Echo 扩充的路径指含有短名： %~s1
Echo 扩充到文件属性： %~a1
Echo 扩充到文件的日期/时间： %~t1
Echo 扩充到文件的大小： %~z1
Echo 扩展到驱动器号和路径：%~dp1 %~dp2
Echo 扩展到文件名和扩展名：%~nx1
Echo 扩展到类似 DIR 的输出行：%~ftza1
Echo. Goto :eof
