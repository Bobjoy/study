# -*- coding: gbk -*-

import urllib.request
import re
from mysql.connector import *

def open_url(url):
	req = urllib.request.Request(url)
	respond = urllib.request.urlopen(req)
	html = respond.read().decode('utf-8')
	return html
	
def get_url_list(url):
	html = open_url(url)
	p = re.compile(r'<a href="(.+)" title=".+ <br>.+?">')
	url_list = re.findall(p, html)
	return url_list
	
def get_img(url):
	url_list = get_url_list(url)
	conn = connect(user='root',password='54a321',database='study')
	c = conn.cursor()
	try:
		c.execute('create table cartoon(name varchar(30), img varchar(100)')
	except:
		count = 0
		for each_url in url_list:
			html = open_url(each_url)
			p1 = re.compile(r'<img src="(.+?)" alt=".+?">')
			p2 = re.compile(r'<h1>(.+)</h1>')
			img_list = re.findall(p1, html)
			title = re.findall(p2, html)
			print(html)
			for each_img in img_list:
				c.execute('insert into cartoon value(%s, %s)', [title[0], each_img])
				count += c.rowcount

		
		print('有%d行数据被插入' % count)

	finally:
		conn.commit()
		c.close()
		conn.close()

num = int(input('前几页: '))
for i in range(num):
	url = 'http://www.ishuhui.com/page/' + str(i+1)
	print(url)
	get_img(url)		