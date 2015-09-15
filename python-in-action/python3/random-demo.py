# -*- coding: utf8 -*-

# Filename: random-demo.py
# author by: bobjoy

# 生成 0 ~ 9之间的随机数

# 九九乘法表
# 九九乘法表
for i in range(1, 10):
        for j in range(1, i+1):
            print('{}x{}={}\t'.format(j, i, j*i), end='')
        print()