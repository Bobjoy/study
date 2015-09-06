#encoding:utf8
import urllib2
import urllib
import re
import sys
import os
import time
 
def Schedule(a,b,c):
    per = 100.0 * a * b / c
    if per > 100 : per = 100
    sys.stdout.write(u"------进度:%.1f%%\r" % per)
    sys.stdout.flush()
     
def createDir():
    path = sys.path[0]
    new_path = os.path.join(path,'flv')
    if not os.path.isdir(new_path):
        os.mkdir(new_path)
    return new_path
     
def getList(id):
    url  = "http://www.yinyuetai.com/insite/get-video-info?flex=true&videoId=%d" % id
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
    try:
        req = urllib2.Request(url, None, headers)
        res = urllib2.urlopen(req)
        html = res.read()
        reg = r"http://\w*?\.yinyuetai\.com/uploads/videos/common/.*?(?=&br)"
        pattern=re.compile(reg)
        findList = re.findall(pattern,html)
        if len(findList) >= 3:
            return findList[2]
        else:
            return findList[0]
    except:
        print u"读取视频列表失败!"
         
def download(id,name):
    link = getList(id)
    if link:
        name = name + '.flv'
        print u"下载:[%s]" % name
        local = createDir()+'/'+name
        try:
            urllib.urlretrieve(link,local,Schedule)
            print u"------下载完成:[%s]\n" % name
        except:
            print u"下载失败！\n"
        #for url in urlList: #下载全部
            #name = url.split('/')[-1].split('?')[0]
            #name = getFlvName(id)+'-%d.flv' % i
            #print u"下载:[%s]" % name
            #local = createDir()+'/'+name
            #urllib.urlretrieve(url,local,Schedule)
            #i += 1
            #print u"    下载完成:[%s]" % name
            #print ''
    else:
        print u"没有发现视频！\n"
 
def getFlvName(id):
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
    timeout = 5
     
    url = 'http://v.yinyuetai.com/video/%d' % id
    request = urllib2.Request(url, None, headers)
    response = urllib2.urlopen(request, None, timeout)
    responseHtml = response.read()
    #print responseHtml
    pattern=re.compile(r"<h3\sclass=\"fl\sf18\">(.+)<\/h3>")
    findList = re.findall(pattern,responseHtml)
    try:
        return findList[0].decode('utf8')
    except:
        return False
 
def start():
    while 1:
        id = raw_input('ID:>')
        try:
            id = int(id)
            break
        except:
            pass
 
    name = getFlvName(id) #读取mv名字
    if name == False: #读取失败则输入
        print u'获取MV名字失败!输入MV名字'
        name = raw_input(u'name:>')
        name = name.decode('gbk')
    #开始下载
    print u"开始下载..."
    download(id,name)
    start()
 
if __name__ == '__main__':
    start()