@echo off
echo ����һ����ʱ�� > tmp.txt
rem �����ȱ��浱ǰĿ¼���ٽ�c:\windoss��Ϊ��ǰĿ¼
pushd e:\Demo %~dp1\nodejs
call :sub tmp.txt
rem ���лָ�ǰ�εĵ�ǰĿ¼
popd
call :sub tmp.txt test4.bat
pause
del tmp.txt
exit
:sub
Echo ɾ�����ţ� %~1 %~2
Echo ���䵽·���� %~f1
Echo ���䵽һ���������ţ� %~d1
Echo ���䵽һ��·���� %~p1
Echo ���䵽һ���ļ����� %~n1
Echo ���䵽һ���ļ���չ���� %~x1
Echo �����·��ָ���ж����� %~s1
Echo ���䵽�ļ����ԣ� %~a1
Echo ���䵽�ļ�������/ʱ�䣺 %~t1
Echo ���䵽�ļ��Ĵ�С�� %~z1
Echo ��չ���������ź�·����%~dp1 %~dp2
Echo ��չ���ļ�������չ����%~nx1
Echo ��չ������ DIR ������У�%~ftza1
Echo. Goto :eof
