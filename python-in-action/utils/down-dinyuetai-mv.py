#encoding: UTF-8
"""
����̨mv��������
2015-02-11
bc523@qq.com
"""
import urllib2
import urllib
import re
import sys
import os
import time
 
class Yinyuetai():
    """
    ���캯��
    @param url mv �б��ַ
    """
    def __init__(self, url):
        self.i = 1
        self.url = url
        self.headers = {
            'User-Agent':'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
            'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
        self.timeout = 30
        self.__init()
    #end def
     
    def __init(self,page=1):
        print u"��ʼ���أ��� %d ҳ ..." % page
        reurl = self.url + "&page=%d" % page
        #print reurl
        mvPageList = self.__getMvPageList(reurl)
        if len(mvPageList) > 0:
            for plist in mvPageList:
                mvlist = self.getMvUrl(plist)
                self.__download(mvlist[0],mvlist[1].decode("utf-8"))
                self.i += 1
            time.sleep(2)
            page += 1
            self.__init(page)
        else:
            print u"\n~~~~~~~~~~~~���!~~~~~~~~~~~~"
             
    #end def
     
    """
    �����б�ҳ
    return ����MV��ַ�������б�[0]:��ƵID[1]:��Ƶ����
    """
    def __getMvPageList(self,url):
        try:
            request = urllib2.Request(url, None, self.headers)
            response = urllib2.urlopen(request, None, self.timeout)
            responseHtml = response.read()
             
            reg = r"<h3><a\shref=\"http:\/\/v.yinyuetai.com\/video\/([0-9]+)\".*title=\"(.*)\".*"
            pattern=re.compile(reg)
            findList = re.findall(pattern,responseHtml)
            return findList
        except:
            return []
     
    #end def
     
    """
    ��ȡ��Ƶ�б�
    @param mvlist ҳ����ƵID�������б�
    return ������Ƶ��ַ(��һ����ַ)(�����3����ַ���򷵻����һ����ַ(����))
    """
    def getMvUrl(self,mvlist):
        url = "http://www.yinyuetai.com/insite/get-video-info?flex=true&videoId=%d" % int(mvlist[0])
        try:
            req = urllib2.Request(url, None, self.headers)
            res = urllib2.urlopen(req,None, self.timeout)
            html = res.read()
             
            reg = r"http://\w*?\.yinyuetai\.com/uploads/videos/common/.*?(?=&br)"
            pattern=re.compile(reg)
            findList = re.findall(pattern,html)
             
            if len(findList) >= 3:
                return [findList[2],mvlist[1]]
            else:
                return [findList[0],mvlist[1]]
        except:
            print u"    ��ȡ��Ƶ�б�ʧ��!\n"
     
    #end def
     
    """
    �����ļ�
    @param url ��Ƶ��ַ
    @param name ��Ƶ����
    """
    def __download(self,url,name):
        name = name + '.flv'
        print u"    ����:[%s]  [%d]" % (name,self.i)
        local = self.__createDir()+'/'+name
        try:
            urllib.urlretrieve(url,local,self.__schedule)
            print u"    �������:[%s]\n" % name
        except:
            print u"    ����ʧ�ܣ�\n"
     
    """
    ����ļ�����·���Ƿ����,�������򴴽�
    return �ļ�����·��
    """
    def __createDir(self):
        path = sys.path[0]
        new_path = os.path.join(path,'flv')
        if not os.path.isdir(new_path):
            os.mkdir(new_path)
        return new_path
         
    #end def
     
    """
    �ص�������ȡ����
    @ a �Ѿ����ص����ݿ�
    @ b ���ݿ�Ĵ�С
    @ c Զ���ļ��Ĵ�С
    """
    def __schedule(self,a,b,c):
        per = 100.0 * a * b / c
        if per > 100 : per = 100
        sys.stdout.write(u" ����:%.1f%%\r" % per)
        sys.stdout.flush()
         
    #end def
     
#end class      
if __name__ == '__main__':
    url = 'http://mv.yinyuetai.com/all?pageType=page&sort=weekViews&tab=allmv&parenttab=mv'
    Yinyuetai(url)