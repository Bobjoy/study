# -*- coding: utf-8 -*-
#---------------------------------------
#   程序：爬虫
#   版本：0.1
#   作者：bobjoy
#   日期：2015-09-15
#   语言：Python 2.7
#   操作：
#   功能：
#---------------------------------------

import urllib
import urllib2
import re
import sys, platform, shutil, time

reload(sys)
sys.setdefaultencoding('utf-8')

class MyException(Exception):
	pass

class Spider:
	
	def __init__(self, url):
		self.siteURL = url
		self.result = {}
		
	def getPage(self):
		request = urllib2.Request(self.siteURL)
		response = urllib2.urlopen(request)
		return response.read().decode('utf-8')
	
	def writeHosts(self, url):
		request = urllib2.Request(url)
		response = urllib2.urlopen(request)
		#try:
		hostData = response.read().decode('utf-8')
		if hostData is not None:
			# get the path of hosts file
			if platform.uname()[0] == 'Windows':
				hostsFile = r'c:\windows\system32\drivers\etc\hosts'
			else:
				hostsFile = r'/etc/hosts'
			# back hosts
			shutil.copyfile(hostsFile, '%s.bak-%s' % (hostsFile, time.strftime('%Y%m%d%H%M%S')))
			# write hosts
			fp = open(hostsFile, 'r')
			lines = fp.readlines()
			fp.close()
			print lines[:5]
			fp = open(hostsFile, 'w')
			fp.writelines(lines[:5])
			fp.write(hostData)
			fp.close()
			
			print 'ok'
		else:
			raise MyException('open the url error')
		#except Exception,ex:
		#	print Exception,':',ex
		
	def getContents(self):
		page = self.getPage()
		pattern = re.compile('<a style="color: #ff0000;" href="(.*?)".*?>((\d+).*?)</a>',re.S)
		items = re.findall(pattern, page)
		for item in items:
			self.result[item[2]] = [item[1], item[0]]
			
		lastest = sorted(self.result.keys()).pop()
		updatedURL = self.result[lastest][1]
		print updatedURL
		self.writeHosts(updatedURL)
			
spider = Spider('http://laod.cn/hosts/2015-google-hosts.html')
spider.getContents()
