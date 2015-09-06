l = [x * x for x in range(1, 11) if x%2 == 0]
print l

l = [m + n for m in 'ABC' for n in 'XYZ']
print l

import os
l = [d for d in os.listdir('.')]
print l

d = {'x':'A','y':'B','z':'C'}
for k, v in d.iteritems():
    print k, '=', v
    
l = [k + '=' + v for k,v in d.iteritems()]
print l

L = ['Hello', 'World', 'IBM', 'Apple']
l = [s.lower() for s in L]
print l