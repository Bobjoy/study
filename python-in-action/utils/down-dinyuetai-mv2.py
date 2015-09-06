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
    sys.stdout.write(u"------����:%.1f%%\r" % per)
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
        print u"��ȡ��Ƶ�б�ʧ��!"
         
def download(id,name):
    link = getList(id)
    if link:
        name = name + '.flv'
        print u"����:[%s]" % name
        local = createDir()+'/'+name
        try:
            urllib.urlretrieve(link,local,Schedule)
            print u"------�������:[%s]\n" % name
        except:
            print u"����ʧ�ܣ�\n"
        #for url in urlList: #����ȫ��
            #name = url.split('/')[-1].split('?')[0]
            #name = getFlvName(id)+'-%d.flv' % i
            #print u"����:[%s]" % name
            #local = createDir()+'/'+name
            #urllib.urlretrieve(url,local,Schedule)
            #i += 1
            #print u"    �������:[%s]" % name
            #print ''
    else:
        print u"û�з�����Ƶ��\n"
 
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
 
    name = getFlvName(id) #��ȡmv����
    if name == False: #��ȡʧ��������
        print u'��ȡMV����ʧ��!����MV����'
        name = raw_input(u'name:>')
        name = name.decode('gbk')
    #��ʼ����
    print u"��ʼ����..."
    download(id,name)
    start()
 
if __name__ == '__main__':
    start()