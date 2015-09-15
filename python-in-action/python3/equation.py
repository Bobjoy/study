# -*- coding: utf8 -*-

# Filename: equation.py
# author: bobjoy

# 二次方程式 ax**2 + bx + c = 0
# a、b、c用户提供

# 导入cmath（复杂数学运算）模块
import cmath

a = float(input(u'输入 a：'))
b = float(input(u'输入 b：'))
c = float(input(u'输入 c：'))

# 计算
d = (b**2) - (4*a*c)

# 两种求解方程式
sol1 = (-b-cmath.sqrt(d)) / (2*a)
sol2 = (-b+cmath.sqrt(d)) / (2*a)

print(u'结果为 {0} 和 {1}'.format(sol1, sol2))