#encoding: UTF-8
"""
音悦台mv批量下载
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
    构造函数
    @param url mv 列表地址
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
        print u"开始下载：第 %d 页 ..." % page
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
            print u"\n~~~~~~~~~~~~完成!~~~~~~~~~~~~"
             
    #end def
     
    """
    分析列表页
    return 返回MV地址和名字列表[0]:视频ID[1]:视频名称
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
    读取视频列表
    @param mvlist 页面视频ID和名字列表
    return 返回视频地址(第一个地址)(如果有3个地址，则返回最后一个地址(高清))
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
            print u"    读取视频列表失败!\n"
     
    #end def
     
    """
    下载文件
    @param url 视频地址
    @param name 视频名称
    """
    def __download(self,url,name):
        name = name + '.flv'
        print u"    下载:[%s]  [%d]" % (name,self.i)
        local = self.__createDir()+'/'+name
        try:
            urllib.urlretrieve(url,local,self.__schedule)
            print u"    下载完成:[%s]\n" % name
        except:
            print u"    下载失败！\n"
     
    """
    检查文件保存路径是否存在,不存在则创建
    return 文件保存路径
    """
    def __createDir(self):
        path = sys.path[0]
        new_path = os.path.join(path,'flv')
        if not os.path.isdir(new_path):
            os.mkdir(new_path)
        return new_path
         
    #end def
     
    """
    回调函数获取进度
    @ a 已经下载的数据块
    @ b 数据块的大小
    @ c 远程文件的大小
    """
    def __schedule(self,a,b,c):
        per = 100.0 * a * b / c
        if per > 100 : per = 100
        sys.stdout.write(u" 进度:%.1f%%\r" % per)
        sys.stdout.flush()
         
    #end def
     
#end class      
if __name__ == '__main__':
    url = 'http://mv.yinyuetai.com/all?pageType=page&sort=weekViews&tab=allmv&parenttab=mv'
    Yinyuetai(url)