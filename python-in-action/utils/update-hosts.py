#!/bin/env python
#conding=utf-8
#updateHosts.py

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import urllib2, sys, shutil, platform, time

if platform.uname()[0] == 'Windows':
	file = r'c:\windows\system32\drivers\etc\hosts'
else:
	file = r'/etc/hosts'

url = 'http://www.360kb.com/kb/2_150.html'
data = urllib2.urlopen(url, None, 10).read()
if data is not None:
	a = data.find('#google-hosts-2015')
	b = data.find('#google-hosts-2015-end')
	if a == -1 or b == -1:
		sys.exit(-1)

	# back hosts
	shutil.copyfile(file, '%s.bak-%s' % (file, time.strftime('%Y%m%d%H%M%S')))
	# write hosts
	fp = open(file, 'w')
	fp.write(data[a:b].replace('<br />', '').replace('&nbsp;', '').replace('<span>', '').replace('</span>', ''))
	fp.close()

	print 'ok'
else:
	print 'url not found'
