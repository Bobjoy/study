# -*- coding: utf-8 -*-
"""
Create on Mon Jan 1 20:28:00 2015

@author: Bobjoy
"""

import sys
reload(sys)
sys.setdefaultencoding('utf-8')


from pyquery import PyQuery as pq
from time import ctime
import time
import re
import os
import urllib

def main(page_start, page_end, flag):
    file_path_pre = 'D:/share/pics'
    folder_name = 'ooxx' if flag else 'pic'
    page_url = 'http://jandan.net/' + folder_name + '/page-'
    folder_name = file_path_pre + folder_name + '/' + str(page_start) + '-' + str(page_end) + '/'
    for page_num in range(page_start, page_end + 1):
        crawl_page(page_url, page_num, folder_name)


    
