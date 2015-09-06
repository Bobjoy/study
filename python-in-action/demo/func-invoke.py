# -*- coding: utf-8 -*-
print unicode(u'中文')

def power(x, n=2):
    s = 1
    while n > 0:
        s = s * x
        n = n -1
        
    return s

y = power(5)
print y

def add_end(L=[]):
    L.append('END')
    return L

a = add_end()
print a

def person(name, age, **kw):
    print 'name:', name, 'age:', age, 'other:', kw
    
person('Michael', 30)
person('Tomshon', 20, city='USA')

def fact(n):
    if n == 1:
        return 1
    return n * fact(n-1)

b = fact(10)
print b

def fact2(n, s):
    return fact_iter(n, 1)

def fact_iter(n, s):
    if n == 1:
        return s
    return fact_iter(n-1, n * s)

c = fact2(5, 1)
print c