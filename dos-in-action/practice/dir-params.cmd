@echo off
:: ��ȡ·��������
:: ��ȡ����Ĵ�·���Ĳ���
:: Test.bat: ���贫��Ĳ���Ϊ��c:\temp\test1.txt
:: ���Ӧ��ȡ���£������1�����Ƕ�Ӧ��%1����Ȼ����Ϊ2,3�ȵȣ��봫��Ĳ�����Ӧ���ɡ�
echo.
echo %~d1
echo %~dp1
echo %~nx1
echo %~n1
echo %~x1
echo %~dp0

mshta vbscript:createobject("sapi.spvoice").speak("����ѧϰlinux�Ĺ����У�Ҳ�����Ѿ��Ӵ���ĳ��������ţ����硱*��������һ��ͨ����ţ�������������ַ������֡�������߾�˵һ˵���õ��������ַ���")(window.close)

echo.