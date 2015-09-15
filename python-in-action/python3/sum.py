# -*- coding: utf8 -*-

# Filename: num.py
# author by: bobjoy

# 用户输入数字
num1 = input(u'输入第一个数字：')
num2 = input(u'输入第二个数字：')

# 求和
mySum = float(num1) + float(num2)

# 显示计算结果
print(u'数字 {0} 和 {1} 相加结果为：{2}'.format(num1, num2, mySum))